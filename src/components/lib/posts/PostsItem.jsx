import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {withRouter} from 'react-router'

class PostsItem extends Component {
  // A: Title + Image should open the “Read More” link - link to the original article
  // B: Title + Image in post list is like in post detail. click them will open original url?
  // A: YES

  renderContent() {
    const {post, listId} = this.props

    // debugger
    return (
      <div className={'row '}></div>
    )
  }

  renderThumbnail() {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post)

    if (imageSet.small) {
      return (
        <div className="post-thumbnail thumbnail_JX64A post-left-thumbnail">
          <div className="container_22rD3 post-list-thumbnail">
            <Telescope.components.BlurryImage
              imageId={post.id + '-thumbnail'}
              containerclassName={'container__Ql6q lazyLoadContainer_3KgZD'}
              imageclassName={'post-list-thumbnail'}
              imageSet={imageSet}
              width={'100%'}
              height={'100%'}
            />
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const {listId} = this.props
    if (typeof listId === 'undefined') {
      throw new Error('You need to set a proper List Id before using PostsItem')
    }
    return (
      <li className="regular-search-result">
        <div className="search-result natural-search-result" data-biz-id="6i7KnRylm4bhPIApDFSVCg" data-key="3"
             data-component-bound="true">
          <div className="biz-listing-large">
            <div className="main-attributes">
              <div className="media-block media-block--12">
                <div className="media-avatar">
                  <div className="photo-box pb-90s">
                    <a href="/biz/daves-hot-chicken-los-angeles" className="js-analytics-click"
                       data-analytics-label="biz-photo">
                      <img alt="Dave's Hot Chicken" className="photo-box-img" height="90"
                           src="https://s3-media4.fl.yelpcdn.com/bphoto/8sLptCjCSN75Ob3kCLJuIA/90s.jpg" width="90"/>

                    </a>

                  </div>


                </div>
                <div className="media-story">
                  <h3 className="search-result-title">
                        <span className="indexed-biz-name">3.
                          <a className="biz-name js-analytics-click"
                             data-analytics-label="biz-name"
                             href="/biz/daves-hot-chicken-los-angeles"
                             data-hovercard-id="tuy4AGHY7sx7DCGiwdkJNw">
                            <span>Dave’s Hot Chicken</span>
                        </a>
                        </span>


                  </h3>

                  <div className="biz-rating biz-rating-large clearfix">


                    <div className="i-stars i-stars--regular-5 rating-large" title="5.0 star rating">
                      <img className="offscreen" height="303"
                           src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png"
                           width="84" alt="5.0 star rating"/>
                    </div>


                    <span className="review-count rating-qualifier">
                    55 reviews
                  </span>

                  </div>


                  <div className="price-category">
                        <span className="bullet-after">

                          <span className="business-attribute price-range">$</span>
                        </span>
                    <span className="category-str-list">
                    <a href="/search?find_desc=&amp;find_loc=Los+Angeles%2C+CA%2C+US&amp;cflt=southern">Southern</a>
                  </span>


                  </div>


                  <ul className="search-result_tags">
                    <li className="tag-18x18_flame-dd5114">
                      <small>
                    <span aria-hidden="true"
                          id="posts_item_span"
                          className="icon icon--18-flame icon--size-18">
                      <svg className="icon_svg">
                      </svg>
                    </span>

                        Opened 8 weeks ago
                      </small>

                    </li>
                  </ul>

                </div>
              </div>
            </div>

            <div className="secondary-attributes">
            <span className="neighborhood-str-list">
            Los Feliz
          </span>

              <address>
                {/*5115 Hollywood Blvd<br>Los Angeles, CA 90027<br>United States*/}
              </address>


              <span className="offscreen">Phone number</span>
              <span className="biz-phone">
              (818) 414-7310
            </span>

            </div>
          </div>

        </div>
      </li>
    )
  }

}

export default withRouter(PostsItem)
