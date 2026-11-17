import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TripAccessSettings from "./pages/TripAccessSettings";
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
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/trips" element={<Layout />}>
            <Route index element={<MyTrips />} />
          </Route>
          <Route path="/trips/:id" element={<Layout />}>
            <Route index element={<TripWorkspace />} />
          </Route>
          <Route path="/create-trip" element={<Layout />}>
            <Route index element={<CreateTrip />} />
          </Route>
          <Route path="/create-trip/1" element={<Layout />}>
            <Route index element={<CreateTrip />} />
          </Route>
          <Route path="/create-trip/2" element={<Layout />}>
            <Route index element={<MyFamilyPreferences />} />
          </Route>
          <Route path="/create-trip/3" element={<Layout />}>
            <Route index element={<InviteOtherMembers />} />
          </Route>
          <Route path="/create-trip/4" element={<Layout />}>
            <Route index element={<TripAccessSettings />} />
          </Route>
          <Route path="/create-trip/5" element={<Layout />}>
            <Route index element={<ReviewSendInvitation />} />
          </Route>
          <Route path="/invitation-sent" element={<Layout />}>
            <Route index element={<InvitationSentSuccess />} />
          </Route>
          <Route path="/member-preference-submission" element={<Layout />}>
            <Route index element={<MemberPreferenceSubmission />} />
          </Route>
          <Route path="/review-member-responses" element={<Layout />}>
            <Route index element={<ReviewMemberResponses />} />
          </Route>
          <Route path="/trip-confirmation" element={<Layout />}>
            <Route index element={<TripConfirmation />} />
          </Route>
          <Route path="/family" element={<Layout />}>
            <Route index element={<Family />} />
          </Route>
          <Route path="/groups" element={<Layout />}>
            <Route index element={<Placeholder title="Groups" />} />
          </Route>
          <Route path="/destinations" element={<Layout />}>
            <Route index element={<Destinations />} />
          </Route>
          <Route path="/experiences" element={<Layout />}>
            <Route index element={<Experiences />} />
          </Route>
          <Route path="/stay-travel" element={<Layout />}>
            <Route index element={<StayTravel />} />
          </Route>
          <Route path="/planning-guide" element={<Layout />}>
            <Route index element={<PlanningGuide />} />
          </Route>
          <Route path="/itinerary" element={<Layout />}>
            <Route index element={<Placeholder title="Itinerary" />} />
          </Route>
          <Route path="/itinerary/day-wise" element={<Layout />}>
            <Route index element={<DayWiseItinerary />} />
          </Route>
          <Route path="/itinerary/member-review" element={<Layout />}>
            <Route index element={<MemberItineraryReview />} />
          </Route>
          <Route path="/itinerary/change-requests" element={<Layout />}>
            <Route index element={<ItineraryChangeRequests />} />
          </Route>
          <Route path="/itinerary/organiser-review" element={<Layout />}>
            <Route index element={<OrganiserReview />} />
          </Route>
          <Route path="/itinerary/final-confirmation" element={<Layout />}>
            <Route index element={<FinalItineraryConfirmation />} />
          </Route>
          <Route path="/budget" element={<Layout />}>
            <Route index element={<Placeholder title="Budget" />} />
          </Route>
          <Route path="/budget/create" element={<Layout />}>
            <Route index element={<CreateBudget />} />
          </Route>
          <Route path="/budget/categories" element={<Layout />}>
            <Route index element={<ExpenseCategories />} />
          </Route>
          <Route path="/budget/contributing-members" element={<Layout />}>
            <Route index element={<SelectContributingMembers />} />
          </Route>
          <Route path="/budget/member-contributions" element={<Layout />}>
            <Route index element={<MemberContributions />} />
          </Route>
          <Route path="/budget/review" element={<Layout />}>
            <Route index element={<BudgetReview />} />
          </Route>
          <Route path="/budget/finalisation" element={<Layout />}>
            <Route index element={<BudgetFinalisation />} />
          </Route>
          <Route path="/tasks/create" element={<Layout />}>
            <Route index element={<TaskCreation />} />
          </Route>
          <Route path="/tasks/assign" element={<Layout />}>
            <Route index element={<AssignResponsibilities />} />
          </Route>
          <Route path="/tasks/my-tasks" element={<Layout />}>
            <Route index element={<MyAssignedTasks />} />
          </Route>
          <Route path="/tasks/progress" element={<Layout />}>
            <Route index element={<TaskProgress />} />
          </Route>
          <Route path="/tasks/organiser-review" element={<Layout />}>
            <Route index element={<TaskOrganiserReview />} />
          </Route>
          <Route path="/travel-hub" element={<Layout />}>
            <Route index element={<TravelHub />} />
          </Route>
          <Route path="/travel-hub/confirmed-itinerary" element={<Layout />}>
            <Route index element={<ConfirmedItinerary />} />
          </Route>
          <Route path="/travel-hub/documents" element={<Layout />}>
            <Route index element={<DocumentsTickets />} />
          </Route>
          <Route path="/travel-hub/group-chat" element={<Layout />}>
            <Route index element={<GroupChat />} />
          </Route>
          <Route path="/travel-hub/quick-actions" element={<Layout />}>
            <Route index element={<QuickActions />} />
          </Route>
          <Route path="/notifications" element={<Layout />}>
            <Route index element={<NotificationsPage />} />
          </Route>
          <Route path="/profile" element={<Layout />}>
            <Route index element={<ProfilePage />} />
          </Route>
          <Route path="/settings" element={<Layout />}>
            <Route index element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
