import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardCard from './pages/homepage/elements/DashboardCard';
import CreateBookPage from './pages/homepage/elements/CreateBookPage';
import CreateArticlePage from './pages/homepage/elements/CreateArticlePage';
import ContactList from './pages/ContactList';
import Login from './component/Login';
import Signup from './component/Signup';
import OrderList from './pages/homepage/OrderList';
import BookList from './pages/homepage/elements/BookList';
import WriterManagement from './pages/homepage/elements/WriterManagement';
import WriterDetail from './pages/homepage/elements/WriterDetail';
import ViewArticleList from './pages/homepage/elements/ViewArticleList';
import ViewArticleDetail from './pages/homepage/elements/ViewArticleDetail';
import CreateWriterForm from './pages/homepage/elements/Createwriter';
import QuestionList from './pages/homepage/elements/QuestionList';
import CreateQuestion from './pages/homepage/elements/CreateQuestion';
import AdminList from './pages/homepage/elements/Admin';
import TranslatorList from './pages/homepage/elements/TranslatorList';
import LanguagesGrid from './pages/homepage/elements/LanguagesGrid';
import TopicList from './pages/homepage/elements/TopicList';
import FeedbackList from './pages/homepage/elements/FeedbackList';
import EventList from './pages/homepage/elements/EventList';
import GoogleRedirectHandler from './pages/firebase/GoogleRedirectHandler';
import PrivateRoute from './component/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <CreateBookPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route
          path="/writers"
          element={
            <PrivateRoute>
              <WriterManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/writers/:id"
          element={
            <PrivateRoute>
              <WriterDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/createwriter"
          element={
            <PrivateRoute>
              <CreateWriterForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/booklist"
          element={
            <PrivateRoute>
              <BookList />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewarticle"
          element={
            <PrivateRoute>
              <ViewArticleList />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewarticle/article/:id"
          element={
            <PrivateRoute>
              <ViewArticleDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/questionlist"
          element={
            <PrivateRoute>
              <QuestionList />
            </PrivateRoute>
          }
        />
        <Route
          path="/createquestion"
          element={
            <PrivateRoute>
              <CreateQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminList />
            </PrivateRoute>
          }
        />
        <Route
          path="/translators"
          element={
            <PrivateRoute>
              <TranslatorList />
            </PrivateRoute>
          }
        />
        <Route
          path="/languages"
          element={
            <PrivateRoute>
              <LanguagesGrid />
            </PrivateRoute>
          }
        />
        <Route
          path="/topic"
          element={
            <PrivateRoute>
              <TopicList />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackList />
            </PrivateRoute>
          }
        />
        <Route
          path="/event"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/article" element={<CreateArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-redirect" element={<GoogleRedirectHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
