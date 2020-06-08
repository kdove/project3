import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../Shared/Components/PropsRoute";
import Home from "../Components/Home/Home";
import Blog from "../Components/Blog/Blog";
import BlogPost from "../Components/Blog/BlogPost";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  return (
    <Switch>
      {blogPosts.map(post => (
        <PropsRoute
          /* We cannot use the url here as it contains the get params */
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.imageSrc}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(blogPost => blogPost.id !== post.id)}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} />)
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired
};

export default memo(Routing);
