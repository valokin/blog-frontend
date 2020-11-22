import React from 'react';
import ReactDom from 'react-dom';
import BlogPostListItem from '../BlogPostListItem';
import PostWithComments from '../../../mocks/postWithComments.json';

import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<BlogPostListItem post={
        PostWithComments
    }></BlogPostListItem>, div);
});

it('renders blog post lits item correctly', () => {
    const {getByTestId } = render(<BlogPostListItem post={
        PostWithComments
    }></BlogPostListItem>) 
    expect(getByTestId('blog-post-list-item-title'))
        .toHaveTextContent('title 1');
    expect(getByTestId('blog-post-list-item-description'))
        .toHaveTextContent('description 1');
    expect(getByTestId('blog-post-list-item-comment-count'))
        .toHaveTextContent('Number of comments: 3');
})

it('matches snapshot', () => {
    const tree = renderer.create(<BlogPostListItem post={
        PostWithComments
    }></BlogPostListItem>).toJSON();

    expect(tree).toMatchSnapshot();
})