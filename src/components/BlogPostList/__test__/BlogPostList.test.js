import React from 'react';
import ReactDom from 'react-dom';
import BlogPostList from '../BlogPostList';
import postsWithComments from '../../../mocks/postsWithComments.json';

import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

const fetchMorePostsWithComments = () => {
}

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMorePostsWithComments={fetchMorePostsWithComments}
    ></BlogPostList>, div);
});

it('renders blog post list correctly', () => {
    render(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMorePostsWithComments={fetchMorePostsWithComments}
    ></BlogPostList>)
})

it('matches snapshot', () => {
    const tree = renderer.create(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMorePostsWithComments={fetchMorePostsWithComments}
    ></BlogPostList>).toJSON();

    expect(tree).toMatchSnapshot();
})