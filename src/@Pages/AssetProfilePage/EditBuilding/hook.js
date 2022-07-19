/* eslint-disable complexity */
import { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const sampleText = '<p></p>';

const getEditorStateDefault = (html) => {
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState0 = EditorState.createWithContent(contentState);
  return editorState0;
};

export default function Hook({ asset, updateAsset, projectPhaseList }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [assetType, setAssetType] = useState('');
  const [marker, setMarker] = useState({ lat: 3.093783, lng: 101.655155 });
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [editorState, setEditorState] = useState(getEditorStateDefault(sampleText));
  const [formDescription, setFormDescription] = useState('');
  const [currentAssetPhase, setCurrentAssetPhase] = useState();

  useEffect(() => {
    setFormDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  const handleSubmit = () => {
    const input = {
      name, id, asset_type: assetType, description: formDescription, lat: marker.lat, lng: marker.lng, location, state, country, currentPhase: currentAssetPhase,
    };
    updateAsset(input, files);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName(asset?.name ?? '');
    setId(asset?.id ?? '');
    setAssetType(asset?.asset_type ?? '');
    setMarker({ lat: asset?.lat ?? 3.093783, lng: asset?.lng ?? 101.655155 });
    setFiles('');
    setLocation(asset?.location ?? '');
    setState(asset?.state ?? '');
    setCountry(asset?.country ?? '');
    setCurrentAssetPhase(asset?.currentPhase ?? '');
  };

  useEffect(() => {
    resetForm();
  }, [asset]);
  useEffect(() => {
    asset?.description && setEditorState(getEditorStateDefault(asset?.description));
  }, [open]);

  return {
    name,
    setName,
    id,
    setId,
    assetType,
    setAssetType,
    marker,
    setMarker,
    files,
    setFiles,
    handleSubmit,
    resetForm,
    location,
    setLocation,
    state,
    setState,
    country,
    setCountry,
    open,
    setOpen,
    editorState,
    setEditorState,
    formDescription,
    projectPhaseList,
    asset,
    currentAssetPhase,
    setCurrentAssetPhase,
  };
}
