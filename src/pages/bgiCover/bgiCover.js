import React, { Component } from "react";
import "./FullScreenImage.css";

class FullScreenImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: true,
    };
  }

  componentDidMount() {
    window.addEventListener("wheel", this.handleScroll, {
      passive: true, // 设置为true可以提高性能
    });
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      showImage: false,
    });
    window.removeEventListener("scroll", this.handleScroll);
  };

  render() {
    const { showImage } = this.state;

    return (
      <div className={`full-screen-image ${showImage ? "show" : "hide"}`}>
        <img
          src="https://join-blogs-pic.oss-cn-beijing.aliyuncs.com/yx/202404251758669.png"
          alt="Full Screen"
          className="full-screen-image__img"
        />
        <div className={`arrow ${showImage ? "animate" : ""}`} />
      </div>
    );
  }
}

export default FullScreenImage;
