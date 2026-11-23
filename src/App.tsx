import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import OtpVerification from "./pages/OtpVerification";
import CreateTrip from "./pages/CreateTrip";
import MyFamilyPreferences from "./pages/MyFamilyPreferences";
import InviteOtherMembers from "./pages/InviteOtherMembers";
import ReviewSendInvitation from "./pages/ReviewSendInvitation";
import InvitationSentSuccess from "./pages/InvitationSentSuccess";
import MemberPreferenceSubmission from "./pages/MemberPreferenceSubmission";
import ReviewMemberResponses from "./pages/ReviewMemberResponses";
import TripConfirmation from "./pages/TripConfirmation";
import TripWorkspace from "./pages/TripWorkspace";
import Destinations from "./pages/Destinations";
import Experiences from "./pages/Experiences";
import StayTravel from "./pages/StayTravel";
import PlanningGuide from "./pages/PlanningGuide";
import DayWiseItinerary from "./pages/DayWiseItinerary";
import MemberItineraryReview from "./pages/MemberItineraryReview";
import ItineraryChangeRequests from "./pages/ItineraryChangeRequests";
import OrganiserReview from "./pages/OrganiserReview";
import FinalItineraryConfirmation from "./pages/FinalItineraryConfirmation";
import CreateBudget from "./pages/CreateBudget";
import ExpenseCategories from "./pages/ExpenseCategories";
import SelectContributingMembers from "./pages/SelectContributingMembers";
import MemberContributions from "./pages/MemberContributions";
import BudgetReview from "./pages/BudgetReview";
import BudgetFinalisation from "./pages/BudgetFinalisation";
import TaskCreation from "./pages/TaskCreation";
import AssignResponsibilities from "./pages/AssignResponsibilities";
import MyAssignedTasks from "./pages/MyAssignedTasks";
import TaskProgress from "./pages/TaskProgress";
import TaskOrganiserReview from "./pages/TaskOrganiserReview";
import TravelHub from "./pages/TravelHub";
import ConfirmedItinerary from "./pages/ConfirmedItinerary";
import DocumentsTickets from "./pages/DocumentsTickets";
import GroupChat from "./pages/GroupChat";
import QuickActions from "./pages/QuickActions";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import Family from "./pages/Family";
import CreateGroup from "./pages/CreateGroup";
import GroupDetails from "./pages/GroupDetails";
import Settings from "./pages/Settings";
import { useTrip } from "./contexts/TripContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useTrip();
  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route
              path="/home"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route
              path="/trips"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<MyTrips />} />
            </Route>
            <Route
              path="/trips/:id"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<TripWorkspace />} />
            </Route>
            <Route path="/create-trip" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<CreateTrip />} />
            </Route>
            <Route
              path="/create-trip/1"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<CreateTrip />} />
            </Route>
            <Route
              path="/create-trip/2"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<MyFamilyPreferences />} />
            </Route>
            <Route
              path="/create-trip/3"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<InviteOtherMembers />} />
            </Route>
            <Route
              path="/create-trip/4"
              element={<ProtectedRoute><Layout /></ProtectedRoute}>
              <Route index element={<ReviewSendInvitation />} />
            </Route>
            <Route path="/invitation-sent" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<InvitationSentSuccess />} />
            </Route>
            <Route path="/trips/:id/invitations" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<InvitationTracking />} />
            </Route>
            <Route path="/member-preference-submission" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<MemberPreferenceSubmission />} />
            </Route>
            <Route path="/review-member-responses" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ReviewMemberResponses />} />
            </Route>
            <Route path="/trip-confirmation" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<TripConfirmation />} />
            </Route>
            <Route path="/destinations" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<Destinations />} />
            </Route>
            <Route path="/experiences" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<Experiences />} />
            </Route>
            <Route path="/stay-travel" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<StayTravel />} />
            </Route>
            <Route path="/planning-guide" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<PlanningGuide />} />
            </Route>
            <Route path="/itinerary" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ItineraryLanding />} />
            </Route>
            <Route path="/itinerary/workspace/:id" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ItineraryWorkspace />} />
            </Route>
            <Route path="/itinerary/member-review" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<MemberItineraryReview />} />
            </Route>
            <Route path="/itinerary/change-requests" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ItineraryChangeRequests />} />
            </Route>
            <Route path="/itinerary/organiser-review" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<OrganiserReview />} />
            </Route>
            <Route path="/itinerary/final-confirmation" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<FinalItineraryConfirmation />} />
            </Route>
            <Route path="/budget" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<Placeholder title="Budget" />} />
            </Route>
            <Route path="/budget/create" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<CreateBudget />} />
            </Route>
            <Route path="/budget/categories" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ExpenseCategories />} />
            </Route>
            <Route path="/budget/contributing-members" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<SelectContributingMembers />} />
            </Route>
            <Route path="/budget/member-contributions" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<MemberContributions />} />
            </Route>
            <Route path="/budget/review" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<BudgetReview />} />
            </Route>
            <Route path="/budget/finalisation" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<BudgetFinalisation />} />
            </Route>
            <Route path="/tasks/create" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<TaskCreation />} />
            </Route>
            <Route path="/tasks/assign" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<AssignResponsibilities />} />
            </Route>
            <Route path="/tasks/my-tasks" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<MyAssignedTasks />} />
            </Route>
            <Route path="/tasks/progress" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<TaskProgress />} />
            </Route>
            <Route path="/tasks/organiser-review" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<TaskOrganiserReview />} />
            </Route>
            <Route path="/travel-hub" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<TravelHub />} />
            </Route>
            <Route path="/travel-hub/confirmed-itinerary" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ConfirmedItinerary />} />
            </Route>
            <Route path="/travel-hub/documents" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<DocumentsTickets />} />
            </Route>
            <Route path="/travel-hub/group-chat" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<GroupChat />} />
            </Route>
            <Route path="/travel-hub/quick-actions" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<QuickActions />} />
            </Route>
            <Route path="/notifications" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<NotificationsPage />} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<ProfilePage />} />
            </Route>
            <Route path="/settings" element={<ProtectedRoute><Layout /></ProtectedRoute}}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;