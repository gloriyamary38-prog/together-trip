
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// FAMILY MEMBER
export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  role: "Trip Owner" | "Family Member";
}

// INVITED MEMBER
export interface InvitedMember {
  id: string;
  name: string;
  phone: string;
  email?: string;
  group?: string;
  source?: "individual" | "group";
  groupId?: string;
  groupName?: string;
  access?: string;
}

// ACCESS SETTINGS
export interface AccessSettings {
  canView:
    | "invited-members-only"
    | "selected-groups-and-invited-members"
    | "anyone-with-link";
  canEdit:
    | "only-me"
    | "me-and-selected-members"
    | "all-invited-members";
  selectedEditors?: string[];
}

// INVITATION
export interface Invitation {
  id: string;
  member: string;
  phone: string;
  status: "Pending" | "Accepted" | "Declined";
  email?: string;
  source?: string;
  groupId?: string;
  groupName?: string;
  access?: string;
  message?: string;
  sentAt?: string;
}

// MEMBER RESPONSE
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

// GROUP MEMBER
export interface GroupMember {
  id: string;
  name: string;
  age: string;
  relationship: string;
  phone: string;
  email: string;
  access: "View Only" | "Edit Access";
}

// GROUP
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

// TRIP DATA
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
  status:
    | "Draft"
    | "Invitations Sent"
    | "Awaiting Confirmation"
    | "Finalised";
  createdAt: string;
  proposedDestinations: string[];
  invitationMessage?: string;
  invitationStatus?: string;
  invitationsSentAt?: string;
}

// STORAGE KEYS
const STORAGE_KEY = "togethertrip_trips";
const AUTH_STORAGE_KEY = "togethertrip_auth";
const GROUPS_STORAGE_KEY = "togethertrip_groups";

// DEFAULT TRIP
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
  proposedDestinations: [],
};

// DEFAULT GROUP
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

// CONTEXT TYPE
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
  updateInvitationStatus: (
    id: string,
    status: "Pending" | "Accepted" | "Declined"
  ) => void;
  addMemberResponse: (response: MemberResponse) => void;
  updateMemberResponse: (
    id: string,
    data: Partial<MemberResponse>
  ) => void;
  resetTrip: () => void;
  logout: () => void;
  groups: Group[];
  createGroup: (data: Partial<Group>) => Group;
  updateGroup: (id: string, data: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
}

// CREATE CONTEXT
const TripContext = createContext<TripContextType | undefined>(
  undefined
);

// PROVIDER
export const TripProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [currentTrip, setCurrentTrip] =
    useState<TripData | null>(null);

  const [isAuthenticated, setAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  const [groups, setGroups] = useState<Group[]>([]);

  // LOAD SAVED TRIPS
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setTrips(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load trips:", error);
    }
  }, []);

  // SAVE TRIPS
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trips)
      );
    } catch (error) {
      console.error("Failed to save trips:", error);
    }
  }, [trips]);

  // SAVE AUTHENTICATION
  useEffect(() => {
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        isAuthenticated.toString()
      );
    } catch (error) {
      console.error("Failed to save authentication:", error);
    }
  }, [isAuthenticated]);

  // LOAD GROUPS
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GROUPS_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setGroups(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load groups:", error);
    }
  }, []);

  // SAVE GROUPS
  useEffect(() => {
    try {
      localStorage.setItem(
        GROUPS_STORAGE_KEY,
        JSON.stringify(groups)
      );
    } catch (error) {
      console.error("Failed to save groups:", error);
    }
  }, [groups]);

  // CREATE GROUP
  const createGroup = useCallback(
    (data: Partial<Group>): Group => {
      const newGroup: Group = {
        ...defaultGroup,
        ...data,
        id: data.id || `group-${Date.now()}`,
        primaryUser: {
          ...defaultGroup.primaryUser,
          ...data.primaryUser,
          name: data.primaryUser?.name || "Group Owner",
          role: data.primaryUser?.role || "Group Owner",
          access: data.primaryUser?.access || "Full Access",
        },
        members: data.members || [],
        createdAt: data.createdAt || new Date().toISOString(),
      };

      setGroups((previous) => [...previous, newGroup]);

      return newGroup;
    },
    []
  );

  // UPDATE GROUP
  const updateGroup = useCallback(
    (id: string, data: Partial<Group>) => {
      setGroups((previous) =>
        previous.map((group) =>
          group.id === id ? { ...group, ...data, id } : group
        )
      );
    },
    []
  );

  // DELETE GROUP
  const deleteGroup = useCallback((id: string) => {
    setGroups((previous) =>
      previous.filter((group) => group.id !== id)
    );
  }, []);

  // CREATE TRIP
  const createTrip = useCallback(
    (data: Partial<TripData>) => {
      const newTrip: TripData = {
        ...defaultTrip,
        ...data,
        id: data.id || `trip-${Date.now()}`,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      setTrips((previous) => {
        const alreadyExists = previous.some(
          (trip) => trip.id === newTrip.id
        );

        if (alreadyExists) {
          return previous.map((trip) =>
            trip.id === newTrip.id ? { ...trip, ...newTrip } : trip
          );
        }

        return [...previous, newTrip];
      });

      setCurrentTrip(newTrip);
    },
    []
  );

  // UPDATE OR INSERT TRIP
  const updateTrip = useCallback(
    (id: string, data: Partial<TripData>) => {
      if (!id) {
        console.error("Cannot save trip without an ID.");
        return;
      }

      let savedTrip: TripData | null = null;

      setTrips((previous) => {
        const existingTrip = previous.find(
          (trip) => trip.id === id
        );

        if (existingTrip) {
          savedTrip = {
            ...existingTrip,
            ...data,
            id,
          };

          return previous.map((trip) =>
            trip.id === id ? savedTrip! : trip
          );
        }

        savedTrip = {
          ...defaultTrip,
          ...data,
          id,
          createdAt: data.createdAt || new Date().toISOString(),
        };

        return [...previous, savedTrip];
      });

      setCurrentTrip((previous) => {
        if (previous?.id === id) {
          return {
            ...previous,
            ...data,
            id,
          };
        }

        return previous || savedTrip;
      });
    },
    []
  );

  // SET CURRENT TRIP
  const setCurrentTripFn = useCallback(
    (trip: TripData | null) => {
      setCurrentTrip(trip);
    },
    []
  );

  // DELETE TRIP
  const deleteTrip = useCallback((id: string) => {
    setTrips((previous) =>
      previous.filter((trip) => trip.id !== id)
    );

    setCurrentTrip((previous) =>
      previous?.id === id ? null : previous
    );
  }, []);

  // ADD INVITATION
  const addInvitation = useCallback(
    (invitation: Invitation) => {
      setCurrentTrip((previous) => {
        if (!previous) return null;

        const updated = {
          ...previous,
          invitations: [
            ...(previous.invitations || []),
            invitation,
          ],
        };

        setTrips((savedTrips) =>
          savedTrips.map((trip) =>
            trip.id === previous.id ? updated : trip
          )
        );

        return updated;
      });
    },
    []
  );

  // UPDATE INVITATION STATUS
  const updateInvitationStatus = useCallback(
    (
      id: string,
      status: "Pending" | "Accepted" | "Declined"
    ) => {
      setCurrentTrip((previous) => {
        if (!previous) return null;

        const updated = {
          ...previous,
          invitations: (previous.invitations || []).map(
            (invitation) =>
              invitation.id === id
                ? { ...invitation, status }
                : invitation
          ),
        };

        setTrips((savedTrips) =>
          savedTrips.map((trip) =>
            trip.id === previous.id ? updated : trip
          )
        );

        return updated;
      });
    },
    []
  );

  // ADD MEMBER RESPONSE
  const addMemberResponse = useCallback(
    (response: MemberResponse) => {
      setCurrentTrip((previous) => {
        if (!previous) return null;

        const updated = {
          ...previous,
          memberResponses: [
            ...(previous.memberResponses || []),
            response,
          ],
        };

        setTrips((savedTrips) =>
          savedTrips.map((trip) =>
            trip.id === previous.id ? updated : trip
          )
        );

        return updated;
      });
    },
    []
  );

  // UPDATE MEMBER RESPONSE
  const updateMemberResponse = useCallback(
    (id: string, data: Partial<MemberResponse>) => {
      setCurrentTrip((previous) => {
        if (!previous) return null;

        const updated = {
          ...previous,
          memberResponses: (previous.memberResponses || []).map(
            (response) =>
              response.id === id
                ? { ...response, ...data }
                : response
          ),
        };

        setTrips((savedTrips) =>
          savedTrips.map((trip) =>
            trip.id === previous.id ? updated : trip
          )
        );

        return updated;
      });
    },
    []
  );

  // RESET CURRENT TRIP
  const resetTrip = useCallback(() => {
    setCurrentTrip(null);
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setAuthenticated(false);
    setCurrentTrip(null);

    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove authentication:", error);
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

// USE TRIP
export const useTrip = () => {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }

  return context;
};
