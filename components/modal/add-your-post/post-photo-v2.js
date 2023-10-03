import React, { useState, useEffect, useRef, } from "react";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Popover from '@mui/material/Popover';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';

import SelectUser from "./select-user";
import {
  setPostImage,
  setPostImageAlternativeText,
  toggleModals,
  searchConnections,
  setImageTaggedUserData,
} from "../../../store/actions";
import { image } from "../../../api";
import { ADMIN_API_URL } from "config";
import { IMAGE_UPLOAD } from "api/routes";
import { defaultFilters, filtersList } from './post-photo-v2-helper';

export const PhotoPostV2 = ({
  show
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(defaultFilters);
  const [alternativeText, setAlternativeText] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  const [rotationAngle, setRotateAngle] = useState(0);
  const [canvasClickPosition, setCanvasClickPosition] = useState({
    top: 0,
    left: 0,
  });

  const [uploading, setUploading] = useState(false);
  const [taggedUserData, setTaggedUserData] = useState([]);
  const [file, setFile] = useState(null);
  const filterListRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapper = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [flippedHorizontal, setFlippedHorizontal] = useState(false);
  const [flippedVertical, setFlippedVertical] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(0); // Default is 'original'
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [maxCanvasSize, setMaxCanvasSize] = useState({ height: 0, width: 0, });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'user-select-popover' : undefined;
  const canvasClickPositionRef = useRef();

  // Update the ref whenever canvasClickPosition changes
  canvasClickPositionRef.current = canvasClickPosition;


  const flipHorizontal = () => {
    setFlippedHorizontal((prev) => !prev); // Toggle the flip state
    setFlippedVertical(false); // Reset vertical flip
  };

  const flipVertical = () => {
    setFlippedVertical((prev) => !prev); // Toggle the flip state
    setFlippedHorizontal(false); // Reset horizontal flip
  };

  useEffect(() => {
    if (file) {
      setMaxCanvasSize({
        width: canvasWrapper.current.offsetWidth,
        height: canvasWrapper.current.offsetWidth * (3 / 4),
      });
      canvasWrapper.current.style.minHeight = canvasWrapper.current.offsetWidth * (3 / 4);
      updateFilters();
    }
  }, [file]);

  const adjustRotateAngle = (angle) => {
    if (angle > 360) setRotateAngle(angle % 360)
    else if (angle < 0) setRotateAngle(360 + angle)
    else setRotateAngle(angle);
  }

  const onImageUploaded = (url) => {
    dispatch(setPostImage(url));
    dispatch(setPostImageAlternativeText(alternativeText));
    dispatch(setImageTaggedUserData(taggedUserData.map((taggedUser) => ({
      "userId": taggedUser.user.userId,
      "xPosition": taggedUser.position.left,
      "yPosition": taggedUser.position.top,
    }))));
    dispatch(toggleModals({ photopostv2: false }));
    dispatch(toggleModals({ addpost: true }));
  };

  const onCancel = () => {
    dispatch(toggleModals({ photopostv2: false }));
  };

  const updateFilter = (value, filterType) => {
    setFilter({
      ...filter,
      [filterType]: parseInt(value),
    });
  }

  /******************* 
  @Purpose : Used for file upload
  @Parameter : {}
  @Author : INIC
  ******************/
  const onUpload = async () => {
    setUploading(true);
    // const canvas = document.getElementById('canvas');
    const dataURL = canvasRef.current.toDataURL();
    if (!dataURL) return;

    const formData = new FormData();

    const type = "image/png";
    const byteString = atob(dataURL.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const bb = new Blob([ab], { type: type });

    formData.append("file", bb);
    try {
      const response = await image(
        { serviceURL: ADMIN_API_URL },
        IMAGE_UPLOAD,
        false,
        formData,
        true
      );
      if (response.status === 1) {
        onImageUploaded(response.data.fileUrl);
      }
    } catch (error) {
      console.log(error);

    }
    setUploading(false);
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      // Calculate the initial dimensions of the image
      const initialWidth = img.width;
      const initialHeight = img.height;

      // Calculate the final dimensions of the rotated image
      const angleInRadians = (rotationAngle * Math.PI) / 180;
      const rotatedWidth = Math.abs(Math.cos(angleInRadians) * initialWidth) + Math.abs(Math.sin(angleInRadians) * initialHeight);
      const rotatedHeight = Math.abs(Math.sin(angleInRadians) * initialWidth) + Math.abs(Math.cos(angleInRadians) * initialHeight);

      // Calculate the scale factor based on the best fit (scale is minimum to fit the rotated image entirely inside the canvas)
      const scaleToFitWidth = maxCanvasSize.width / rotatedWidth;
      const scaleToFitHeight = maxCanvasSize.height / rotatedHeight;
      const maxScaleFactor = Math.min(scaleToFitWidth, scaleToFitHeight);
      const finalScaleFactor = maxScaleFactor * zoomScale;

      // Limit canvas size to prevent overflow
      const limitedCanvasWidth = Math.min(maxCanvasSize.width, rotatedWidth * finalScaleFactor);
      const limitedCanvasHeight = Math.min(maxCanvasSize.height, rotatedHeight * finalScaleFactor);

      // Set the canvas size to match the rotated image size or the limited size

      const inputImageAspectRatio = limitedCanvasWidth / limitedCanvasHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = limitedCanvasWidth;
      let outputHeight = limitedCanvasHeight;

      if (selectedAspectRatio != 0) {
        if (inputImageAspectRatio > selectedAspectRatio) {
          outputWidth = limitedCanvasHeight * selectedAspectRatio;
        } else if (inputImageAspectRatio < selectedAspectRatio) {
          outputHeight = limitedCanvasWidth / selectedAspectRatio;
        }
      }


      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Clear the canvas and draw the image with transformations
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the center of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Apply transformations
      ctx.translate(centerX, centerY);
      ctx.rotate(angleInRadians);
      if (flippedHorizontal) {
        ctx.scale(-1, 1); // Flip horizontally
      }
      if (flippedVertical) {
        ctx.scale(1, -1); // Flip vertically
      }

      ctx.scale(finalScaleFactor, finalScaleFactor);

      // Set the filter for image effects
      ctx.filter = getFilterString();

      // Draw the image with its center at (0, 0)
      ctx.drawImage(img, -initialWidth / 2, -initialHeight / 2);

      ctx.restore();
    };

    img.src = imgSrc;
  };

  useEffect(() => {
    if (imgSrc) {
      drawImage();
    }
  }, [imgSrc, rotationAngle, zoomScale, flippedHorizontal, flippedVertical, filter, selectedAspectRatio]);

  const onImageLoad = (file) => {
    setFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImgSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const updateFilters = () => {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);

    image.onload = function () {
      let newWidth, newHeight;
      if (image.width > image.height) {
        newWidth = 100;
        newHeight = (image.height / image.width) * 100;
      } else {
        newHeight = 100;
        newWidth = (image.width / image.height) * 100;
      }

      filtersList.forEach(filter => {
        const canvas = document.getElementById(filter.id);
        const context = canvas.getContext('2d');
        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas.crossOrigin = "anonymous";
        const filterString =
          "brightness(" + filter.filters.brightnessSlider + "%" +
          ") contrast(" + filter.filters.contrastSlider + "%" +
          ") grayscale(" + filter.filters.grayscaleSlider + "%" +
          ") saturate(" + filter.filters.saturationSlider + "%" +
          ") sepia(" + filter.filters.sepiaSlider + "%" +
          ") hue-rotate(" + filter.filters.hueRotateSlider + "deg" + ")";

        context.filter = filterString;
        context.globalCompositeOperation = "copy";
        context.drawImage(image, 0, 0, newWidth, newHeight);
      });
    };
  };

  const onReset = () => {
    setFlippedHorizontal(false);
    setFlippedVertical(false);
    setSelectedAspectRatio(0);
    setZoomScale(1);
    setRotateAngle(0);
    setFilter(defaultFilters);
  };

  const getFilterString = () => {
    return ("brightness(" + filter.brightnessSlider + "%" +
      ") contrast(" + filter.contrastSlider + "%" +
      ") grayscale(" + filter.grayscaleSlider + "%" +
      ") saturate(" + filter.saturationSlider + "%" +
      ") sepia(" + filter.sepiaSlider + "%" +
      ") hue-rotate(" + filter.hueRotateSlider + "deg" + ")");
  }

  const onFilterScroll = (scrollSize) => {
    filterListRef.current.scrollLeft += scrollSize;
  }

  const onCanvasClick = (event) => {
    const canvas = document.getElementById('canvas');
    const bb = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - bb.left) / bb.width * canvas.width);
    const y = Math.floor((event.clientY - bb.top) / bb.height * canvas.height);
    setCanvasClickPosition({
      left: x,
      top: y,
    });

    const position = {
      top: event.clientY,
      left: event.clientX,
    };

    setPopoverPosition(position);
    setAnchorEl(event.currentTarget);
  };

  const onUserSelect = (selectedUser) => {
    setAnchorEl(null);
    const currentCanvasClickPosition = canvasClickPositionRef.current;
    if (taggedUserData.findIndex(taggerUser => taggerUser.user.id == selectedUser.id) == -1) {
      setTaggedUserData(prev => { return [...prev, { user: selectedUser, position: currentCanvasClickPosition }] });
    } else {
      setTaggedUserData(prev => prev.map((taggedUser) => {
        if (taggedUser.user.userId != selectedUser.userId) return taggedUserData;
        return { ...taggedUser, position: currentCanvasClickPosition }
      }));
    }
  };

  const onUserRemove = (userId) => {
    setTaggedUserData(prev => prev.filter((taggedUser) => taggedUser.user.userId != userId));
  };

  const showTooltip = () => {
    taggedUserData.forEach((taggedUser) => {
      const tooltip = document.getElementById("tooltip" + taggedUser.user.userId);
      tooltip.style.display = 'flex';
    });
  }

  function hideTooltip() {
    taggedUserData.forEach((taggedUser) => {
      const tooltip = document.getElementById("tooltip" + taggedUser.user.userId);
      tooltip.style.display = 'none';
    });
  }

  const onCanvasMouseMove = (event) => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the mouse position falls within the area you want to show the tooltip
    // You can adjust these conditions based on your specific use case
    if (x > 1 && x < canvas.width - 3 && y > 1 && y < canvas.height - 3) {
      showTooltip();
    } else {
      hideTooltip();
    }
  }

  const props = {
    name: 'file',
    multiple: false,
    height: 200,
    width: "100%",
    className: "w-100",
    showUploadList: false,
    accept: "image/*",
    onChange(info) {
      onImageLoad(info.file.originFileObj);
    },
  };

  const sliderDesignProp = {
    trackStyle: { background: "#0F6BBF" },
    handleStyle: {
      background: "#0F6BBF",
      border: "0",
      width: "10px",
      height: "10px",
      marginTop: "-3px",
    }
  };

  const handlePopoverClose = () => setAnchorEl(null);

  return (
    <Modal
      open={true}
      onClose={onCancel}
      className="image-editor-modal"
    >
      <div className="image-editor-wrapper">
        <Grid container>
          <Grid xs={12}>
            <div className="p-12 d-flex align-items-center justify-content-between image-editor-modal-header">
              <h4 className="m-0 section-title">Optimise the image</h4>
              <HighlightOffRoundedIcon style={{ fontSize: '20px' }} onClick={onCancel} />
            </div>
          </Grid>
          <Grid xs={file ? 6 : 12}>
            <div className="image-preview p-12">
              {
                !file &&

                <input
    type="file"
    onChange={e => onImageLoad(e.target.files[0])}
  />
                // <Dragger {...props} >
                //   <div>
                //     <p>
                //       <InboxOutlined />
                //     </p>
                //     <p className="ant-upload-text">Click or drag file to this area to upload</p>
                //   </div>
                // </Dragger>
              }
              <img id="sourceImage" crossorigin="anonymous" />
              <img id="editedImage" crossorigin="anonymous" />
              <div ref={canvasWrapper} style={{ minHeight: maxCanvasSize.height + 5 }} className="preview-canvas-wrapper">
                <div className="canvas-tooltip-wrapper">
                  <canvas
                    ref={canvasRef}
                    onMouseMove={onCanvasMouseMove}
                    onClick={onCanvasClick}
                    id="canvas"
                    width="0"
                    height="0"
                    aria-describedby={id}
                  />

                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      popoverPosition.top && popoverPosition.left
                        ? { top: popoverPosition.top, left: popoverPosition.left }
                        : undefined
                    }
                  >
                    <SelectUser
                      onSelect={onUserSelect}
                      onSearchUser={searchConnections}
                      handleClose={handlePopoverClose}
                    />
                  </Popover>

                  {
                    taggedUserData.map((taggedUser) => (
                      <div
                        className="canvas-tooltip"
                        style={{ left: taggedUser.position.left + 'px', top: taggedUser.position.top + 'px' }}
                        id={"tooltip" + taggedUser.user.userId}
                      >
                        <span>{taggedUser.user.firstName}</span>
                        &nbsp;
                        <SvgIcon onClick={() => onUserRemove(taggedUser.user.userId)} className="filter-sroll-icon-right" fontSize="small">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_12791_227499)">
                              <path d="M2.05108 11.9491C1.38251 11.3034 0.849233 10.5309 0.48237 9.67691C0.115507 8.82288 -0.0775965 7.90434 -0.0856732 6.97489C-0.0937499 6.04543 0.083362 5.12368 0.435328 4.2634C0.787294 3.40313 1.30707 2.62156 1.96431 1.96431C2.62156 1.30707 3.40313 0.787294 4.2634 0.435328C5.12368 0.083362 6.04543 -0.0937499 6.97489 -0.0856732C7.90434 -0.0775965 8.82288 0.115507 9.67691 0.48237C10.5309 0.849233 11.3034 1.38251 11.9491 2.05108C13.2242 3.3713 13.9297 5.13951 13.9138 6.97489C13.8978 8.81027 13.1617 10.566 11.8638 11.8638C10.566 13.1617 8.81027 13.8978 6.97489 13.9138C5.13951 13.9297 3.3713 13.2242 2.05108 11.9491ZM3.03808 10.9621C4.08887 12.0129 5.51404 12.6032 7.00008 12.6032C8.48612 12.6032 9.91129 12.0129 10.9621 10.9621C12.0129 9.91129 12.6032 8.48612 12.6032 7.00008C12.6032 5.51404 12.0129 4.08887 10.9621 3.03808C9.91129 1.98729 8.48612 1.39697 7.00008 1.39697C5.51404 1.39697 4.08887 1.98729 3.03808 3.03808C1.98729 4.08887 1.39697 5.51404 1.39697 7.00008C1.39697 8.48612 1.98729 9.91129 3.03808 10.9621ZM9.96808 5.01908L7.98708 7.00008L9.96808 8.98108L8.98108 9.96808L7.00008 7.98708L5.01908 9.96808L4.03208 8.98108L6.01308 7.00008L4.03208 5.01908L5.01908 4.03208L7.00008 6.01308L8.98108 4.03208L9.96808 5.01908Z" fill="#77838F" />
                            </g>
                            <defs>
                              <clipPath id="clip0_12791_227499">
                                <rect width="14" height="14" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </SvgIcon>
                      </div>
                    ))
                  }
                  {/* </Popover> */}
                </div>
              </div>
              {
                file && <div className="d-flex align-items-center justify-content-start"> <textarea
                  className="rounded image-editor-text-area"
                  rows={4}
                  placeholder="Add alternative text here...."
                  maxLength={1000}
                  onChange={(event) => setAlternativeText(event.target.value)}
                  cols="40"
                />
                </div>
              }
            </div>
          </Grid>
          {
            file && (<Grid xs={6}>
              <div className="p-12">
                <Grid container className="mb-3 pb-3 image-editor-crop-wrapper">
                  <Grid xs={12}>
                    <span className="title" level={5}>Crop</span>
                  </Grid>

                  <Grid xs={12}>
                    <Button variant="outlined" onClick={onReset} size="small">Original</Button> &nbsp;
                    <Button variant="outlined" onClick={() => setSelectedAspectRatio(1 / 1)} size="small">Square</Button> &nbsp;
                    <Button variant="outlined" onClick={() => setSelectedAspectRatio(4 / 1)} size="small">4:1</Button> &nbsp;
                    <Button variant="outlined" onClick={() => setSelectedAspectRatio(3 / 4)} size="small">3:4</Button> &nbsp;
                    <Button variant="outlined" onClick={() => setSelectedAspectRatio(16 / 9)} size="small">16:9</Button>
                  </Grid>
                </Grid>

                <Grid container className="mb-3 pb-3 d-flex image-editor-position-wrapper">
                  <Grid xs={12}>
                    <span className="title">Position</span>
                  </Grid>
                  <Grid xs={4}>
                    <span className="slider-title">Zoom</span>
                    <Slider
                      className="image-editor-slider"
                      value={zoomScale}
                      step={0.1}
                      onChange={(e) => setZoomScale(e.target.value)}
                      min={0}
                      max={2}
                      size="small"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid xs={4}>
                    <span className="slider-title">Straighten</span>
                    <Slider
                      className="image-editor-slider"
                      valueLabelDisplay="auto"
                      value={rotationAngle}
                      step={1}
                      onChange={(e) => adjustRotateAngle(e.target.value)}
                      min={0}
                      max={360}
                      size="small"
                    />
                  </Grid>
                  <Grid xs={4} className="d-flex align-items-center justify-content-center">

                    <SvgIcon className="optimization-icon m-1" onClick={() => adjustRotateAngle(rotationAngle + 90)} fontSize="medium">
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.66797 12.8336C8.39714 12.8336 9.08012 12.6975 9.71693 12.4252C10.3537 12.153 10.9103 11.7787 11.3867 11.3023C11.8631 10.8259 12.2374 10.2693 12.5096 9.63252C12.7819 8.99571 12.918 8.31273 12.918 7.58356H12.043C12.043 8.79884 11.6176 9.83183 10.7669 10.6825C9.91623 11.5332 8.88325 11.9586 7.66797 11.9586C6.45269 11.9586 5.4197 11.5332 4.56901 10.6825C3.71832 9.83183 3.29297 8.79884 3.29297 7.58356C3.29297 6.36828 3.70616 5.3353 4.53255 4.4846C5.35894 3.63391 6.37977 3.20856 7.59505 3.20856H7.93047L6.86589 4.27314L7.4638 4.88564L9.60755 2.74189L7.4638 0.598145L6.86589 1.19606L8.00339 2.33356H7.66797C6.9388 2.33356 6.25582 2.46967 5.61901 2.74189C4.9822 3.01412 4.42561 3.38842 3.94922 3.86481C3.47283 4.3412 3.09852 4.8978 2.8263 5.5346C2.55408 6.17141 2.41797 6.85439 2.41797 7.58356C2.41797 8.31273 2.55408 8.99571 2.8263 9.63252C3.09852 10.2693 3.47283 10.8259 3.94922 11.3023C4.42561 11.7787 4.9822 12.153 5.61901 12.4252C6.25582 12.6975 6.9388 12.8336 7.66797 12.8336Z" fill="#303439" />
                      </svg>
                    </SvgIcon>

                    <SvgIcon className="optimization-icon m-1" fontSize="medium" onClick={() => adjustRotateAngle(rotationAngle - 90)}>
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.66797 12.8336C6.9388 12.8336 6.25582 12.6975 5.61901 12.4252C4.9822 12.153 4.42561 11.7787 3.94922 11.3023C3.47283 10.8259 3.09852 10.2693 2.8263 9.63252C2.55408 8.99571 2.41797 8.31273 2.41797 7.58356H3.29297C3.29297 8.79884 3.71832 9.83183 4.56901 10.6825C5.4197 11.5332 6.45269 11.9586 7.66797 11.9586C8.88325 11.9586 9.91623 11.5332 10.7669 10.6825C11.6176 9.83183 12.043 8.79884 12.043 7.58356C12.043 6.36828 11.6298 5.3353 10.8034 4.4846C9.977 3.63391 8.95616 3.20856 7.74089 3.20856H7.40547L8.47005 4.27314L7.87214 4.88564L5.72839 2.74189L7.87214 0.598145L8.47005 1.19606L7.33255 2.33356H7.66797C8.39714 2.33356 9.08012 2.46967 9.71693 2.74189C10.3537 3.01412 10.9103 3.38842 11.3867 3.86481C11.8631 4.3412 12.2374 4.8978 12.5096 5.5346C12.7819 6.17141 12.918 6.85439 12.918 7.58356C12.918 8.31273 12.7819 8.99571 12.5096 9.63252C12.2374 10.2693 11.8631 10.8259 11.3867 11.3023C10.9103 11.7787 10.3537 12.153 9.71693 12.4252C9.08012 12.6975 8.39714 12.8336 7.66797 12.8336Z" fill="#303439" />
                      </svg>
                    </SvgIcon>
                    <SvgIcon className="optimization-icon m-1" fontSize="medium" onClick={flipHorizontal}>
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_12776_228067)">
                          <path d="M5.91797 12.2502H4.7513V11.0835H5.91797V12.2502ZM3.58464 5.25016H2.41797V4.0835H3.58464V5.25016ZM12.918 2.91683V11.0835C12.918 11.7281 12.3959 12.2502 11.7513 12.2502H9.41797V11.0835H11.7513V2.91683H9.41797V1.75016H11.7513C12.3959 1.75016 12.918 2.27225 12.918 2.91683ZM3.58464 1.75016V2.91683H2.41797C2.41797 2.27225 2.94005 1.75016 3.58464 1.75016ZM8.2513 13.4168H7.08464V0.583496H8.2513V13.4168ZM3.58464 9.91683H2.41797V8.75016H3.58464V9.91683ZM5.91797 2.91683H4.7513V1.75016H5.91797V2.91683ZM3.58464 7.5835H2.41797V6.41683H3.58464V7.5835ZM3.58464 12.2502C2.94005 12.2502 2.41797 11.7281 2.41797 11.0835H3.58464V12.2502Z" fill="#303439" />
                        </g>
                        <defs>
                          <clipPath id="clip0_12776_228067">
                            <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 1 14.668 0)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
                    <SvgIcon className="optimization-icon m-1" fontSize="medium" onClick={flipVertical}>
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_12776_228067)">
                          <path d="M12.9167 8.75V9.91667H11.75V8.75H12.9167ZM5.91667 11.0833V12.25H4.75V11.0833H5.91667ZM3.58333 1.75L11.75 1.75C12.3946 1.75 12.9167 2.27208 12.9167 2.91667V5.25L11.75 5.25V2.91667L3.58333 2.91667V5.25H2.41667V2.91667C2.41667 2.27208 2.93875 1.75 3.58333 1.75ZM2.41667 11.0833H3.58333V12.25C2.93875 12.25 2.41667 11.7279 2.41667 11.0833ZM14.0833 6.41667V7.58333L1.25 7.58333L1.25 6.41667L14.0833 6.41667ZM10.5833 11.0833V12.25H9.41667V11.0833H10.5833ZM3.58333 8.75V9.91667H2.41667V8.75H3.58333ZM8.25 11.0833V12.25H7.08333V11.0833H8.25ZM12.9167 11.0833C12.9167 11.7279 12.3946 12.25 11.75 12.25V11.0833H12.9167Z" fill="#0F6BBF" />
                        </g>
                        <defs>
                          <clipPath id="clip0_12776_228067">
                            <rect width="14" height="14" fill="white" transform="matrix(0 1 1 0 0.667969 0)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
                  </Grid>
                </Grid>

                <Grid container className="mb-3 pb-3 image-editor-optimization-wrapper">
                  <Grid xs={12}>
                    <span className="title">Optimization</span>
                  </Grid>
                  <Grid xs={4}>
                    <span className="slider-title">Brightness</span>
                    <Slider
                      className="image-editor-slider"
                      value={filter.brightnessSlider}
                      onChange={(e) => updateFilter(e.target.value, "brightnessSlider")}
                      min={0}
                      max={300}
                      size="small"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid xs={4}>
                    <span className="slider-title">Contrast</span>
                    <Slider
                      className="image-editor-slider"
                      value={filter.contrastSlider}
                      onChange={(e) => updateFilter(e.target.value, "contrastSlider")}
                      min={0}
                      max={200}
                      size="small"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid xs={4}>
                    <span className="slider-title">Saturation</span>
                    <Slider
                      className="image-editor-slider"
                      value={filter.saturationSlider}
                      onChange={(e) => updateFilter(e.target.value, "saturationSlider")}
                      min={0}
                      max={300}
                      size="small"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>

                <div className="mb-3 image-editor-filters-wrapper">
                  <Grid container>
                    <Grid xs={12}>
                      <span className="title">Filters</span>
                    </Grid>
                  </Grid>
                  <div className="filter-image-box-list-wrapper">
                    <SvgIcon onClick={() => { onFilterScroll(-120) }} className="filter-sroll-icon-left" fontSize="small">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white" />
                        <g clip-path="url(#clip0_12777_228112)">
                          <path d="M14.843 15.825L11.0263 12L14.843 8.175L13.668 7L8.66797 12L13.668 17L14.843 15.825Z" fill="#051F4E" />
                        </g>
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#D1D5DB" />
                        <defs>
                          <clipPath id="clip0_12777_228112">
                            <rect width="20" height="20" fill="white" transform="translate(2 2)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
                    <ul ref={filterListRef} className="filter-image-box-list">
                      {filtersList.map((filter, index) => {
                        return (
                          <div className={`filter-image-box${index != filtersList.length - 1 ? " mr-3" : ""}`}>
                            <canvas
                              onClick={() => {
                                setFilter(filter.filters);
                              }}
                              className="filter-canvas"
                              id={filter.id}
                              height="0"
                            >
                            </canvas>
                            <span className="font-12 text-gray-darker">
                              {filter.name}
                            </span>
                          </div>
                        );
                      })}
                    </ul>
                    <SvgIcon onClick={() => { onFilterScroll(120) }} className="filter-sroll-icon-right" fontSize="small">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white" />
                        <g clip-path="url(#clip0_12777_228113)">
                          <path d="M9.16016 15.825L12.9768 12L9.16016 8.175L10.3352 7L15.3352 12L10.3352 17L9.16016 15.825Z" fill="#051F4E" />
                        </g>
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#D1D5DB" />
                        <defs>
                          <clipPath id="clip0_12777_228113">
                            <rect width="20" height="20" fill="white" transform="translate(2 2)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
                  </div>
                </div>
              </div>
            </Grid>)
          }
          {file && <div className="image-editor-modal-footer">
            <Button variant="outlined" onClick={onReset} size="medium">Reset</Button>
            <Button variant="contained" onClick={onUpload} size="medium">Done</Button>
          </div>}
        </Grid>
      </div>
    </Modal>
  );
};
