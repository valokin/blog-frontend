import './App.css';
import { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { debounce } from 'lodash';

import BlogPostPage from './pages/BlogPostPage';
import BlogPage from './pages/BlogPage'
import { getPosts, loadNextBatchOfComments } from './services/posts';

export const DataContext = createContext({});

function App() {
  const [postsWithComments, setpostsWithComments] = useState([])
  const [posts, setPosts] = useState([]);
  const fetchPostsData = debounce( async () => {
    const posts = await getPosts();
    setPosts(posts);
  }, 500);

  const debouncedBatchFetchCall = debounce(
    () => loadNextBatchOfComments(posts, postsWithComments, setpostsWithComments),
    3000,
  );

  useEffect(() => {
    loadNextBatchOfComments(posts, postsWithComments, setpostsWithComments);
  }, [posts])

  return (
    <DataContext.Provider value={{
      posts,
      postsWithComments,
      fetchPostsData,
      fetchMoreComments: debouncedBatchFetchCall,
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
