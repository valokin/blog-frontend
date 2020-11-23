import './App.css';
import { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { debounce } from 'lodash';
import { DEBOUNCE_DURATION_INFINITE_SCROLL_BLOG } from './config';

import BlogPostPage from './pages/BlogPostPage';
import BlogPage from './pages/BlogPage'
import { getPosts, loadNextBatchOfComments } from './services/posts';

export const DataContext = createContext({});

const useBlogAPI = () => {
  const [postsWithComments, setpostsWithComments] = useState([])
  const [posts, setPosts] = useState([]);

  const fetchPostsData = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  const debouncedBatchFetchCall = debounce(
    () => loadNextBatchOfComments(posts, postsWithComments, setpostsWithComments),
    DEBOUNCE_DURATION_INFINITE_SCROLL_BLOG,
  );

  useEffect(() => {
    loadNextBatchOfComments(posts, postsWithComments, setpostsWithComments);
  }, [posts])

  return {
    posts,
    postsWithComments,
    fetchPostsData,
    fetchMorePostsWithComments: debouncedBatchFetchCall,
  }
}

function App() {
  const { 
    posts,
    postsWithComments,
    fetchPostsData,
    fetchMorePostsWithComments 
  } = useBlogAPI();

  return (
    <DataContext.Provider value={{
      posts,
      postsWithComments,
      fetchPostsData,
      fetchMorePostsWithComments,
    }}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/post/:id">
              <BlogPostPage />
            </Route>
            <Route path="/">
              <BlogPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </DataContext.Provider>
  );
}


export default App;
