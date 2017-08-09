import React, {Component} from 'react';

class F8PhotosSelectLeftPanel extends Component {
  render() {
    const {photos} = this.props;

    return (

      <div className="media-details-grid_main">
        <div className="media js-media-photo" data-photo-id="fNoqHpp82jyhATSelcwgGA">

          <img alt="Photo of Roma Antica - San Francisco, CA, United States"
               className="photo-box-img"
               src="https://s3-media3.fl.yelpcdn.com/bphoto/fNoqHpp82jyhATSelcwgGA/o.jpg"/>
        </div>


        <Telescope.components.F8PhotosSelectLeftPanelFooterView {...this.props}/>
        {/*{01-left-footer.html}*/}

      </div>
    );
  }
}


export default F8PhotosSelectLeftPanel;
