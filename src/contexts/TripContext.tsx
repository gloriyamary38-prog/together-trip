import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  role: "Trip Owner" | "Family Member";
}

export interface InvitedMember {
  id: string;
  name: string;
  phone: string;
  group?: string;
}

export interface AccessSettings {
  canView: "invited-members-only" | "selected-groups-and-invited-members" | "anyone-with-link";
  canEdit: "only-me" | "me-and-selected-members" | "all-invited-members";
  selectedEditors?: string[];
}

export interface Invitation {
  id: string;
  member: string;
  phone: string;
  status: "Pending" | "Accepted" | "Declined";
}

export interface MemberResponse {
  id: string;
  member: string;
  destinationConfirmation: "confirm" | "suggest";
  suggestedDestinations: string[];
  preferences: string[];
  availableDates: string;
  unavailableDates: string;
  comments: string;
  status: "Not Submitted" | "Submitted";
}

export interface GroupMember {
  id: string;
  name: string;
  age: string;
  relationship: string;
  phone: string;
  email: string;
  access: "View Only" | "Edit Access";
}

export interface Group {
  id: string;
  name: string;
  description: string;
  primaryUser: {
    name: string;
    role: string;
    access: string;
  };
  members: GroupMember[];
  createdAt: string;
}

export interface TripData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  tripType: string;
  purpose: string;
  familyMembers: FamilyMember[];
  preferences: string[];
  invitedMembers: InvitedMember[];
  selectedGroups: string[];
  accessSettings: AccessSettings;
  invitations: Invitation[];
  memberResponses: MemberResponse[];
  status: "Draft" | "Invitations Sent" | "Awaiting Confirmation" | "Finalised";
  createdAt: string;
}

const STORAGE_KEY = "togethertrip_trips";
const AUTH_STORAGE_KEY = "togethertrip_auth";
const GROUPS_STORAGE_KEY = "togethertrip_groups";

const defaultTrip: TripData = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  destination: "",
  tripType: "Family",
  purpose: "",
  familyMembers: [],
  preferences: [],
  invitedMembers: [],
  selectedGroups: [],
  accessSettings: {
    canView: "selected-groups-and-invited-members",
    canEdit: "me-and-selected-members",
    selectedEditors: [],
  },
  invitations: [],
  memberResponses: [],
  status: "Draft",
  createdAt: "",
};

interface TripContextType {
  trips: TripData[];
  currentTrip: TripData | null;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  createTrip: (data: Partial<TripData>) => void;
  updateTrip: (id: string, data: Partial<TripData>) => void;
  setCurrentTrip: (trip: TripData | null) => void;
  deleteTrip: (id: string) => void;
  addInvitation: (invitation: Invitation) => void;
  updateInvitationStatus: (id: string, status: "Pending" | "Accepted" | "Declined") => void;
  addMemberResponse: (response: MemberResponse) => void;
  updateMemberResponse: (id: string, data: Partial<MemberResponse>) => void;
  resetTrip: () => void;
  logout: () => void;
  groups: Group[];
  createGroup: (data: Partial<Group>) => Group;
  updateGroup: (id: string, data: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
}

const defaultGroup: Group = {
  id: "",
  name: "",
  description: "",
  primaryUser: {
    name: "",
    role: "",
    access: "",
  },
  members: [],
  createdAt: "",
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripData | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated.toString());
    } catch (e) {
      console.error("Failed to save auth state to localStorage", e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load trips from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.error("Failed to save trips to localStorage", e);
    }
  }, [trips]);

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GROUPS_STORAGE_KEY);
      if (stored) {
        setGroups(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load groups from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
    } catch (e) {
      console.error("Failed to save groups to localStorage", e);
    }
  }, [groups]);

  const createGroup = useCallback(
    (data: Partial<Group>) => {
      const newGroup: Group = {
        id: data.id || `group-${Date.now()}`,
        name: data.name || "",
        description: data.description || "",
        primaryUser: {
          name: data.primaryUser?.name || "Priya S.",
          role: data.primaryUser?.role || "Group Owner",
          access: data.primaryUser?.access || "Full Access",
        },
        members: data.members || [],
        createdAt: new Date().toISOString(),
      };
      setGroups((prev) => [...prev, newGroup]);
      return newGroup;
    },
    []
  );

  const updateGroup = useCallback(
    (id: string, data: Partial<Group>) => {
      setGroups((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...data } : g))
      );
    },
    []
  );

  const deleteGroup = useCallback((id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const createTrip = useCallback(
    (data: Partial<TripData>) => {
      const newTrip: TripData = {
        ...defaultTrip,
        ...data,
        id: data.id || `trip-${Date.now()}`,
        createdAt: data.createdAt || new Date().toISOString(),
      };
      setTrips((prev) => [...prev, newTrip]);
      setCurrentTrip(newTrip);
    },
    []
  );

  const updateTrip = useCallback(
    (id: string, data: Partial<TripData>) => {
      setTrips((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
      setCurrentTrip((prev) => (prev?.id === id ? { ...prev, ...data } : prev));
    },
    []
  );

  const setCurrentTripFn = useCallback((trip: TripData | null) => {
    setCurrentTrip(trip);
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    if (currentTrip?.id === id) {
      setCurrentTrip(null);
    }
  }, [currentTrip]);

  const addInvitation = useCallback((invitation: Invitation) => {
    setCurrentTrip((prev) => {
      if (!prev) return null;
      const updated = { ...prev, invitations: [...prev.invitations, invitation] };
      setTrips((trips) => {
        return trips.map((t) => (t.id === prev.id ? updated : t));
      });
      return updated;
    });
  }, []);

  const updateInvitationStatus = useCallback(
    (id: string, status: "Pending" | "Accepted" | "Declined") => {
      setCurrentTrip((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          invitations: prev.invitations.map((inv) =>
            inv.id === id ? { ...inv, status } : inv
          ),
        };
        setTrips((trips) => {
          return trips.map((t) => (t.id === prev.id ? updated : t));
        });
        return updated;
      });
    },
    []
  );

  const addMemberResponse = useCallback((response: MemberResponse) => {
    setCurrentTrip((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        memberResponses: [...prev.memberResponses, response],
      };
      setTrips((trips) => {
        return trips.map((t) => (t.id === prev.id ? updated : t));
      });
      return updated;
    });
  }, []);

  const updateMemberResponse = useCallback(
    (id: string, data: Partial<MemberResponse>) => {
      setCurrentTrip((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          memberResponses: prev.memberResponses.map((r) =>
            r.id === id ? { ...r, ...data } : r
          ),
        };
        setTrips((trips) => {
          return trips.map((t) => (t.id === prev.id ? updated : t));
        });
        return updated;
      });
    },
    []
  );

  const resetTrip = useCallback(() => {
    setCurrentTrip(null);
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setCurrentTrip(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to remove auth state from localStorage", e);
    }
  }, []);

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        isAuthenticated,
        setAuthenticated,
        createTrip,
        updateTrip,
        setCurrentTrip: setCurrentTripFn,
        deleteTrip,
        addInvitation,
        updateInvitationStatus,
        addMemberResponse,
        updateMemberResponse,
        resetTrip,
        logout,
        groups,
        createGroup,
        updateGroup,
        deleteGroup,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};