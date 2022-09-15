/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric'; // this also installed on your project
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import uuid from 'react-uuid';
import detectZoom from 'detect-zoom';
import { Button, makeStyles } from '@material-ui/core';
import AnnotateIcon from '@Assets/Icons/AnnotateIcon';
import {
  Delete as DeleteIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import DeleteDialog from '@Components/DeleteDialog';

const rectDefaultProps = {
  fill: 'transparent',
  strokeWidth: 1,
  stroke: '#03A398',
  hasControls: true,
  hasRotatingPoint: false,
  hasBorders: false,
  strokeUniform: true,
  autoScaleStrokeWidth: false,
};
const panUnitsPerClick = 10;
const useStyles = makeStyles(() => ({
  annotateButton: { backgroundColor: 'var(--primary-color)', color: 'white' },
}));
export default function AnnotateImage({
  mainImage, mainImageAnnotations, setMainImageAnnotations, setMainAnnotationId, setIsLoading, user, severity, paperRef, inspection_module, buttonTour
}) {
  const ref = useRef(null);
  const classes = useStyles();
  const [marginAdjustment, setMarginAdjustment] = useState({});
  const [lock_canvas_w, setlock_canvas_w] = useState(paperRef.current?.offsetWidth); // default 10 / 14 * window.screen.width
  const [lock_canvas_h, setlock_canvas_h] = useState(paperRef.current?.offsetHeight); // default 5 / 8 * window.screen.height
  const [onZoomRatio, setOnZoomRatio] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteAnnotation, setDeleteAnnotation] = useState();
  const [imageSettings, setimageSettings] = useState({});
  const [deleteActiveId, setDeleteActiveId] = useState(0);
  window.onresize = function onresize() {
    const device = detectZoom.device();
    setOnZoomRatio(device);
  };
  let imageSettingsOnLoad = {};
  const userCanEditAnnotation = true;
  // for zoom and pan
  let isDragging = false;
  let lastPosX;
  let lastPosY;
  // end for zoom and pan
  const { editor, onReady } = useFabricJSEditor();
  // button action
  const onAddRectangle = () => {
    const newId = uuid();
    const newObj = {
      id: newId,
      is_close: 0,
      isNew: true,
      SeverityId: 1,
    };
    const newRectPostion = {
      top: editor.canvas?.height * 0.5 - (150 / 2),
      left: editor.canvas?.width * 0.5 - (150 / 2),
      width: 150,
      height: 150,
      ...imageSettings,
      marginAdjustment,
    };
    const rect = new fabric.Rect({ ...newObj, ...newRectPostion, ...rectDefaultProps });
    editor.canvas.add(rect);

    // add to state action bar
    setMainAnnotationId(newId);
    const newMainAnnotationList = [...mainImageAnnotations];
    console.log('ANN DEBUG: new rect newRectPostion', newRectPostion);
    console.log('ANN DEBUG: new rect marginAdjustment', marginAdjustment);
    newRectPostion.left -= (marginAdjustment.paddingLeft ?? 0);
    newRectPostion.top -= (marginAdjustment.paddingTop ?? 0);
    console.log('ANN DEBUG: new rect newRectPostion after adjustment', newRectPostion);
    newMainAnnotationList.push({ ...newObj, points: JSON.stringify(newRectPostion) });
    setMainImageAnnotations(newMainAnnotationList);
    editor.canvas.setActiveObject(rect);
    rect.on('selected', somethingChangeInCanvas);
  };
  const onDelRectangle = () => {
    const activeObject = editor.canvas.getActiveObject();
    const activeId = activeObject.get('id');
    const is_close = activeObject.get('is_close');
    console.log('ANN DEBUG: Deleting this annotation', activeId, activeObject);
    if (is_close) {
      setOpenDialog(true);
      setDeleteAnnotation(activeObject);
      setDeleteActiveId(activeId);
      return;
    }
    editor.canvas.remove(activeObject);
    setMainAnnotationId();
    setMainImageAnnotations(prevVal => prevVal.filter(ann => ann.id !== activeId));
  };
  // const panIn = () => {
  //   editor.canvas.setZoom(editor.canvas.getZoom() * 1.1);
  // };
  // const panOut = () => {
  //   editor.canvas.setZoom(editor.canvas.getZoom() / 1.1);
  // };
  // const panRight = () => {
  //   editor.canvas.relativePan(new fabric.Point(panUnitsPerClick, 0));
  // };
  // const panLeft = () => {
  //   editor.canvas.relativePan(new fabric.Point(-panUnitsPerClick, 0));
  // };
  // const panUp = () => {
  //   editor.canvas.relativePan(new fabric.Point(0, -panUnitsPerClick));
  // };
  // const panDown = () => {
  //   editor.canvas.relativePan(new fabric.Point(0, panUnitsPerClick));
  // };
  // button action
  // mouse action
  // const onMouseWheel = (opt) => {
  //   const delta = opt.e.deltaY;
  //   let zoom = editor.canvas.getZoom();
  //   zoom *= 0.999 ** delta;
  //   if (zoom > 20) zoom = 20;
  //   if (zoom < 0.01) zoom = 0.01;
  //   editor.canvas.setZoom(zoom);
  //   opt.e.preventDefault();
  //   opt.e.stopPropagation();
  // };
  // const onMouseDown = (opt) => {

  // }
  // const onMouseMove = (opt) => {

  // }
  // const onMouseUp = (opt) => {

  // }
  function onMouseWheel(opt) {
    const { e } = opt;
    zoomDelta(editor.canvas, e.deltaY, e.offsetX, e.offsetY);
    e.preventDefault();
    e.stopPropagation();
  }

  const zoomDelta = (canvas, delta, x, y, maxZoom = 10, minZoom = 0.1) => {
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    zoom = Math.min(zoom, maxZoom);
    zoom = Math.max(zoom, minZoom);
    const point = {
      x,
      y,
    };
    canvas.zoomToPoint(point, zoom);
    const w = 4;
    const strokeWidth = w / canvas.getZoom();
    const canvasObjects = canvas.getObjects();
    for (let i = 0; i < canvasObjects.length; i++) {
      canvasObjects[i].set('strokeWidth', strokeWidth);
    }
  };

  const getClientPosition = (e) => {
    const positionSource = e.touches ? e.touches[0] : e;
    const {
      clientX,
      clientY,
    } = positionSource;
    return {
      clientX,
      clientY,
    };
  };

  const onMouseDown = (opt) => {
    const {
      e,
    } = opt;
    isDragging = true;
    const {
      clientX,
      clientY,
    } = getClientPosition(e);
    lastPosX = clientX;
    lastPosY = clientY;
    editor.canvas.selection = false; // if want to select multiple
    // editor.canvas.discardActiveObject();
  };

  const onMouseMove = (opt) => {
    const activeObject = editor.canvas.getActiveObject();
    if (!!activeObject) return;
    // console.log('ANN DEBUG: only drag canvas when click on canvas', activeObject, !!activeObject);
    if (!isDragging) {
      return;
    }
    const {
      e,
    } = opt;
    const T = editor.canvas.viewportTransform;
    const {
      clientX,
      clientY,
    } = getClientPosition(e);
    T[4] += clientX - lastPosX;
    T[5] += clientY - lastPosY;
    editor.canvas.requestRenderAll();
    lastPosX = clientX;
    lastPosY = clientY;
  };

  const onMouseUp = (opt) => {
    // const { x, y } = opt.absolutePointer;
    editor.canvas.setViewportTransform(editor.canvas.viewportTransform);
    isDragging = false;
    editor.canvas.selection = true;
  };
  const somethingChangeInCanvas = (e) => {
    const activeId = e.target.get('id');
    console.log(`ANN DEBUG items in canvas change: box id:${activeId} modified!!`);
    // new postion n size after modified
    console.log('ANN DEBUG items in canvas change: marginAdjustment', marginAdjustment);
    console.log('ANN DEBUG items in canvas change: l t', e.target, e.target.get('left'), e.target.get('top'));
    console.log('ANN DEBUG items in canvas change: lo to', e.target.get('leftMarginOffset'), e.target.get('topMarginOffset'));
    console.log('ANN DEBUG items in canvas change: canvasMarginAdjustment', imageSettings.canvasMarginAdjustment);
    let selfmarginAdjustment = {};
    if (e.target.get('marginAdjustment')) selfmarginAdjustment = e.target.get('marginAdjustment');
    const { canvasMarginAdjustment = {} } = imageSettings;
    const newPoints = {
      left: e.target.get('left')
        - (e.target.get('leftMarginOffset') ?? selfmarginAdjustment.paddingLeft ?? canvasMarginAdjustment.left ?? 0),
      top: e.target.get('top')
        - (e.target.get('topMarginOffset') ?? selfmarginAdjustment.paddingTop ?? canvasMarginAdjustment.top ?? 0),
      width: e.target.get('width') * e.target.get('scaleX'),
      height: e.target.get('height') * e.target.get('scaleY'),
      strokeWidth: e.target.get('strokeWidth'),
      strokeWidthUnscaled: e.target.get('strokeWidthUnscaled'),
      ...imageSettings,
      ...imageSettingsOnLoad,
    };
    console.log(`ANN DEBUG items in canvas change: box new size: ${JSON.stringify(newPoints)}`);
    setMainAnnotationId(activeId);
    setMainImageAnnotations(prevVal => prevVal.map(ann => (ann.id === activeId ? ({ ...ann, points: JSON.stringify(newPoints) }) : ann)));
  };
  // END mouse action
  useEffect(() => {
    console.log('ANN DEBUG: width ref', ref.current ? ref.current.offsetWidth : 0);
    // console.log('ANN DEBUG: height ref', ref.current ? ref.current.offsetHeight : 0);
    console.log('ANN DEBUG: width paperRef', paperRef.current ? paperRef.current?.offsetWidth : 0);
    console.log('ANN DEBUG: height paperRef', paperRef.current ? paperRef.current?.offsetHeight : 0);
    setlock_canvas_w(paperRef.current?.offsetWidth);
    setlock_canvas_h(paperRef.current?.offsetHeight);
  }, [paperRef.current, ref.current]);
  useEffect(() => {
    if (!editor) return;
    if (!mainImage?.src) return;
    fabric.Image.fromURL(`${process.env.REACT_APP_S3}/${mainImage.src}`, (oImg) => {
      console.log('ANN DEBUG: original editor.canvas', editor.canvas);
      console.log('ANN DEBUG: window view port', window.screen.height, window.screen.width);
      const isImgLandscape = oImg.width >= oImg.height;

      let wcanvas = lock_canvas_w; // editor.canvas.width;
      let hcanvas = lock_canvas_h; // editor.canvas.height;
      console.log('ANN DEBUG: canvas w', wcanvas, 'canvas h', hcanvas);
      // --- lock ratio by canvas
      // const wratio = 985 / oImg.width;
      // const hratio = 738.75 / oImg.height;
      // --- lock ratio by image
      let wratio = wcanvas / oImg.width;
      let hratio = hcanvas / oImg.height;
      console.log('ANN DEBUG: ratio w', wratio, ' h', hratio);
      if (isImgLandscape) {
        console.log('ANN DEBUG: img is landscape w > h');
        hratio = wratio;
        hcanvas = oImg.height * hratio;
      } else {
        console.log('ANN DEBUG: img is portrait h > w');
        // change isLockImgHeight to false if want full width in potrait
        const isLockImgHeight = false;
        if (isLockImgHeight) {
          console.log('ANN DEBUG: img h is locked');
          // --- fix height to image
          hratio = 1;
          wratio = 1;
          hcanvas = oImg.height;
          wcanvas = oImg.width;
        } else {
          // --- extend height if full width
          console.log('ANN DEBUG: img h is extended');
          hratio = wratio;
          hcanvas = oImg.height * hratio;
        }
      }

      // -- lock canvas height
      console.log('ANN DEBUG: mm window.screen', window.screen.width, window.screen.height);
      // const lock_canvas_w = 10 / 14 * window.screen.width;
      // const lock_canvas_h = window.screen.height - 340; // top(100) + bottom(240)
      console.log('ANN DEBUG: mm original img', oImg.width, oImg.height);
      console.log('ANN DEBUG: mm after potrait landscape', wcanvas, hcanvas);
      console.log('ANN DEBUG: mm lock_canvas', lock_canvas_w, lock_canvas_h, marginAdjustment);
      const lock_ratio_w = lock_canvas_w / oImg.width;
      const lock_ratio_h = lock_canvas_h / oImg.height;
      const canvasMarginAdjustment = {};
      if (oImg.height * lock_ratio_w > lock_canvas_h) {
        // readjusting ratio
        console.log('ANN DEBUG: canvas height more than lock value', lock_canvas_h, hratio);
        hcanvas = lock_canvas_h;
        hratio = lock_ratio_h;
        wratio = hratio;
        wcanvas = oImg.width * wratio;
        console.log('ANN DEBUG: width ref margin adjustment', wcanvas, lock_canvas_w);
        console.log('ANN DEBUG: begin adjustment lock_canvas_w - wcanvas', lock_canvas_w, wcanvas, lock_canvas_w - wcanvas);
        const left_adjustment = (lock_canvas_w - wcanvas) / 2;
        canvasMarginAdjustment.left = left_adjustment;
        setMarginAdjustment({ paddingLeft: left_adjustment });
      } else if (oImg.width * lock_ratio_h > lock_canvas_w) {
        // readjusting ratio
        console.log('ANN DEBUG: canvas width more than lock value', lock_canvas_w, wratio);
        wcanvas = lock_canvas_w;
        wratio = lock_ratio_w;
        hratio = wratio;
        hcanvas = oImg.height * hratio;
        console.log('ANN DEBUG: begin adjustment lock_canvas_h - hcanvas', lock_canvas_h, hcanvas, lock_canvas_h - hcanvas);
        const top_adjustment = (lock_canvas_h - hcanvas) / 2;
        canvasMarginAdjustment.top = top_adjustment;
        setMarginAdjustment({ paddingTop: top_adjustment });
      }
      // if (hcanvas > lock_canvas_h) {
      //   // readjusting ratio
      //   console.log('ANN DEBUG: canvas height more than lock value', lock_canvas_h, hratio);
      //   hcanvas = lock_canvas_h;
      //   hratio = lock_canvas_h / oImg.height;
      //   wratio = hratio;
      //   wcanvas = oImg.width * wratio;
      //   console.log('ANN DEBUG: width ref margin adjustment', wcanvas, lock_canvas_w)
      //   setMarginAdjustment({ paddingLeft: (lock_canvas_w - wcanvas) / 2 });
      // } else if (wcanvas > lock_canvas_w) {
      //   // readjusting ratio
      //   console.log('ANN DEBUG: canvas width more than lock value', lock_canvas_w, wratio);
      //   wcanvas = lock_canvas_w;
      //   wratio = lock_canvas_w / oImg.width;
      //   hratio = wratio;
      //   hcanvas = oImg.height * hratio;
      //   setMarginAdjustment({ paddingTop: (lock_canvas_h - hcanvas) / 2 });
      // }
      // -- end lock canvas height

      console.log('ANN DEBUG: h', oImg.height, 'canvas', hcanvas, 'r', hratio);
      console.log('ANN DEBUG: w', oImg.width, 'canvas', wcanvas, 'r', wratio);
      editor.canvas.setHeight(lock_canvas_h);
      editor.canvas.setWidth(lock_canvas_w);
      const imgSet = {
        image_size_during_annotation_width: wcanvas,
        image_size_during_annotation_height: hcanvas,
        image_intrinsic_size_width: oImg.width,
        image_intrinsic_size_height: oImg.height,
      };
      console.log('ANN DEBUG: imgset:', imgSet)
      // imageSettings = { ...imgSet, canvasMarginAdjustment };
      imageSettingsOnLoad = { ...imgSet };
      setimageSettings({ ...imgSet, canvasMarginAdjustment });
      // end lock ratio
      // editor.canvas.setHeight(oImg.height * hratio);
      console.log('ANN DEBUG: adjusted editor.canvas', editor.canvas);
      editor.canvas.setBackgroundImage(oImg, editor.canvas.renderAll.bind(editor.canvas), {
        ...canvasMarginAdjustment,
        scaleX: wratio,
        scaleY: hratio,
      });
      editor.canvas.remove(...editor.canvas.getObjects());
      for (let annIdx = 0; annIdx < mainImageAnnotations.length; annIdx++) {
        const { id, points, is_close } = mainImageAnnotations[annIdx];
        const {
          left, top, width, height,
          image_size_during_annotation_width,
          image_size_during_annotation_height,
          image_intrinsic_size_width,
          // leftMarginOffset,
          // topMarginOffset,
        } = JSON.parse(points);
        const leftRatio = image_size_during_annotation_width / wcanvas;
        const topRatio = image_size_during_annotation_height / hcanvas;
        console.log('ANN DEBUG: point ratio', leftRatio, topRatio);
        const isLock = (userCanEditAnnotation) ? {} : { lockMovementX: true, lockMovementY: true };
        console.log('ANN DEBUG: canvasMarginAdjustment', canvasMarginAdjustment);
        console.log('ANN DEBUG: annotation left', image_size_during_annotation_width, image_size_during_annotation_width ? left / leftRatio : left);
        console.log('ANN DEBUG: annotation top', image_size_during_annotation_height, image_size_during_annotation_height ? top / topRatio : top);
        const rect = new fabric.Rect({
          id,
          is_close,
          left: (image_size_during_annotation_width ? left / leftRatio : left)
            + (canvasMarginAdjustment.left ?? 0), // adding offset
          top: (image_size_during_annotation_height ? top / topRatio : top)
            + (canvasMarginAdjustment.top ?? 0), // adding offset
          width: image_size_during_annotation_width ? width / leftRatio : width,
          height: image_size_during_annotation_height ? height / topRatio : height,
          leftMarginOffset: canvasMarginAdjustment.left ?? 0,
          topMarginOffset: canvasMarginAdjustment.top ?? 0,
          ...rectDefaultProps,
          stroke: '#51DBA5',
          ...isLock,
        });
        editor.canvas.add(rect);
        // set active for first index
        // if (!annIdx) editor.canvas.setActiveObject(rect);
        rect.on('selected', somethingChangeInCanvas);
      }
      setIsLoading(false);
    });
    // zoom on mouse wheel
    editor.canvas.on('mouse:wheel', onMouseWheel);
    editor.canvas.on('mouse:down', onMouseDown);
    editor.canvas.on('mouse:move', onMouseMove);
    editor.canvas.on('mouse:up', onMouseUp);
    if (userCanEditAnnotation) editor.canvas.on('object:modified', somethingChangeInCanvas);
    // old style, fabric 2.0 has to bind directly with rect object for dom event
    // editor.canvas.on('object:selected', somethingChangeInCanvas);
  }, [mainImage, onZoomRatio, lock_canvas_w, lock_canvas_h]);
  return (
    // <div className="draw-image-container" style={{ ...marginAdjustment }} ref={ref}>
    <div className="draw-image-container" style={{ display: !!mainImage.is_main ? 'none' : 'block' }} ref={ref}>
      <div style={{ position: 'relative', zIndex: 1, left: 50, top: 30, height: 0, width: 'fit-content' }}>
        {userCanEditAnnotation && !mainImage.is_main && (
          <>
            <Button variant="contained" className={classes.annotateButton} onClick={onAddRectangle} data-tut={buttonTour}><AnnotateIcon /><p className="text-white">&nbsp; Annotate</p></Button>
            &nbsp;
            {editor?.canvas.getActiveObject() && (
              <Button variant="contained" color="secondary" onClick={onDelRectangle}><DeleteIcon /><p className="text-white">&nbsp; Remove</p></Button>
            )}
            <DeleteDialog
              open={openDialog}
              setOpen={setOpenDialog}
              message="You intend to delete a closed issue, this will also delete the site reports submitted."
              deleteFunction={() => {
                editor.canvas.remove(deleteAnnotation);
                setMainAnnotationId();
                setMainImageAnnotations(prevVal => prevVal.filter(ann => ann.id !== deleteActiveId));
              }}
            />
          </>
        )}
        {/* if need to zoom and pan with button */}
        {/* &nbsp;
        <Button variant="contained" color="primary" onClick={() => panIn()}><ZoomInIcon /></Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={() => panOut()}><ZoomOutIcon /></Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={() => panLeft()}><ArrowLeftIcon /></Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={() => panRight()}><ArrowRightIcon /></Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={() => panUp()}><ArrowDropUpIcon /></Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={() => panDown()}><ArrowDropDownIcon /></Button> */}
      </div>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
