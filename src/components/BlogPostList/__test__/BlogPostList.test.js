import React from 'react';
import ReactDom from 'react-dom';
import BlogPostList from '../BlogPostList';
import postsWithComments from '../../../mocks/postsWithComments.json';

import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

const fetchMoreComments = () => {
}

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMoreComments={fetchMoreComments}
    ></BlogPostList>, div);
});

it('renders blog post list correctly', () => {
    render(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMoreComments={fetchMoreComments}
    ></BlogPostList>)
})

it('matches snapshot', () => {
    const tree = renderer.create(<BlogPostList 
        postsWithComments={postsWithComments}
        fetchMoreComments={fetchMoreComments}
    ></BlogPostList>).toJSON();

    expect(tree).toMatchSnapshot();
})