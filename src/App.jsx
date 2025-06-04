import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarFooter from './pages/homepage/elements/CreateBookPage';
import CreateBookPage from './pages/homepage/elements/CreateBookPage';
import DashboardCard from './pages/homepage/elements/DashboardCard';
import CreateArticlePage from './pages/homepage/elements/CreateArticlePage';



import ContactList from './pages/ContactList';
import Login from './component/Login'
import Signup from './component/Signup'
import OrderList from './pages/homepage/OrderList';
import BookList from './pages/homepage/elements/BookList'
import WriterManagement from './pages/homepage/elements/WriterManagement';
import WriterDetail from  './pages/homepage/elements/WriterDetail';
import ViewArticleList from './pages/homepage/elements/ViewArticleList';
import ViewArticleDetail from './pages/homepage/elements/ViewArticleDetail';
import CreateWriterForm from './pages/homepage/elements/Createwriter';
import QuestionList from './pages/homepage/elements/QuestionList';
import CreateQuestion from './pages/homepage/elements/CreateQuestion';
import AdminList from './pages/homepage/elements/Admin';
import TranslatorList from './pages/homepage/elements/TranslatorList';
import LanguagesGrid from './pages/homepage/elements/LanguagesGrid'
import TopicList from './pages/homepage/elements/TopicList';
import FeedbackList from './pages/homepage/elements/FeedbackList';
import EventList from './pages/homepage/elements/EventList';
import GoogleRedirectHandler from "./pages/firebase/GoogleRedirectHandler";
import PrivateRoute from './component/PrivateRoute';

const App = () => {
  return (

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<DashboardCard />} />
    //     <Route path="/book" element={<CreateBookPage />} />
    
    
    
    //     <Route path="/contact" element={<ContactList />} />
    //     <Route path="/writers" element={<WriterManagement />} />
    //     <Route path="/writers/:id" element={<WriterDetail />} />
    //     <Route path="/createwriter" element={<CreateWriterForm />} />
    //     <Route path="/booklist" element={<BookList />} />
    //     <Route path="/viewarticle" element={<ViewArticleList />} />
    //     <Route path="/viewarticle/article/:id" element={<ViewArticleDetail />} />
    //     <Route path="/questionlist" element={<QuestionList />} />
    //     <Route path="/createquestion" element={<CreateQuestion />} />
    //     <Route path="/admin" element={<AdminList />} />
    //     <Route path="/translator" element={<TranslatorList />} />
    //     <Route path="/languages" element={<LanguagesGrid />} />
    //     <Route path="/topic" element={<TopicList />} />
    //     <Route path="/feedback" element={<FeedbackList />} />
    //     <Route path="/event" element={<EventList />} />
    
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/google-redirect" element={<GoogleRedirectHandler />} />
    
    
    
    
    //     {/* <Route path="/contact_page_list" element={<ContactList />} /> */}
    
    //   </Routes>
    // </Router>
    
    <Router>
      <Routes>
        {/* Protected routes */}
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

        {/* ...add PrivateRoute similarly to other protected routes */}        

        {/* Public routes */}
          <Route path="/article" element={<CreateArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-redirect" element={<GoogleRedirectHandler />} />
      </Routes>
    </Router>

  )
}

export default App