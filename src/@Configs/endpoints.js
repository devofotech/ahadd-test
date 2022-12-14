/* eslint-disable max-len */
export const URL = process.env.REACT_APP_ENDPOINT_URL;

export const endpoints = {
  ssoCallback: (platform) => ['GET', `${URL}auth/${platform}/callback`],
  paymentWebhook: () => ['POST', `${URL}payment_webhook`],
  changedefaultpaymentmethod: () => ['POST', `${URL}api/user-update/defaultpaymentmethod`],
  changePlan: () => ['POST', `${URL}api/user-update/subscription`],
  endPlan: () => ['POST', `${URL}api/endsubscription`],
  getCloudProcessing: (id) => ['GET', `${URL}api/cloudprocessing/${id}`],
  getCloudProcessingPayment: (id) => ['GET', `${URL}api/cloudprocessing-payment/${id}`],
  newCloudProcessing: (AssetId) => ['POST', `${URL}api/cloudprocessing/${AssetId}`],
  uploadCloudProcessing: (id) => ['POST', `${URL}api/cloudprocessing-upload/${id}`],
  uploadCloudProcessingBySession: (session_uuid, batch_uuid) => ['POST', `${URL}api/cloudprocessing-upload/${session_uuid}?isSession=1&upload_session=${batch_uuid}`],
  getPayment: (intent) => ['GET', `${URL}api/payment/${intent}`],
  newPaymentCredit: () => ['POST', `${URL}api/paywithcredit`],
  newPayment: () => ['POST', `${URL}api/payment`],
  getMapping: () => ['GET', `${URL}api/mapping`],
  updateCpToAsset: (id) => ['GET', `${URL}api/mapping-to-asset/${id}`],
  updateMapping: (id) => ['POST', `${URL}api/mapping/${id}`],
  uploadMapping: (id) => ['POST', `${URL}api/mapping-upload/${id}`],
  getStaticData: () => ['GET', `${URL}staticdata`],
  getGuides: () => ['GET', `${URL}guides`],
  getToken: () => ['POST', `${URL}login`],
  register: () => ['POST', `${URL}signup`],
  subscribe: () => ['POST', `${URL}subscribe`],
  getProfile: () => ['GET', `${URL}api/user`],
  getPaymentMethods: (type) => ['GET', `${URL}api/user-payment/listmethod/${type}`],
  getWallet: () => ['GET', `${URL}api/wallet-balance`],
  getCard: () => ['GET', `${URL}api/user-card/list`],
  createCard: () => ['POST', `${URL}api/user-card/add`],
  removeCard: () => ['DELETE', `${URL}api/user-card/delete`],
  getTransactionHistory: () => ['GET', `${URL}api/transaction-history`],
  activityLog: () => ['GET', `${URL}api/activitylog`],
  requestTokenToResetPassword: () => ['POST', `${URL}forgot-password`],
  verifyResetPasswordToken: () => ['POST', `${URL}verify-reset-password-token`],
  resetPassword: () => ['POST', `${URL}reset-password`],

  getInspectionSession: () => ['GET', `${URL}api/inspection`],
  getInspectionDetails: (InspectionId) => ['GET', `${URL}api/inspection/${InspectionId}`],
  getSeverity: () => ['GET', `${URL}api/severity`],
  deleteInspection: (id) => ['DELETE', `${URL}api/inspection/${id}`],
  newInspection: (AssetId) => ['POST', `${URL}api/inspection/${AssetId}`],
  updateInspection: (InspectionId) => ['POST', `${URL}api/inspection-update/${InspectionId}`],
  getInspectionFile: () => ['GET', `${URL}api/inspectionfile`],
  uploadInspectionFile: uuid => ['POST', `${URL}api/inspectionfile/${uuid}`],
  deleteInspectionFile: id => ['DELETE', `${URL}api/inspectionfile/${id}`],
  updateInspectionFileAnnotate: () => ['POST', `${URL}api/inspectionfile-annotate`],
  setMainImage: () => ['POST', `${URL}api/inspectionfile-setmain`],
  setLocationOnMainImage: (InspectionFileId) => ['POST', `${URL}api/inspectionfile-update/${InspectionFileId}`],

  closeIssue: (annotationId) => ['POST', `${URL}api/annotation/${annotationId}`],

  getAssets: () => ['GET', `${URL}api/asset`],
  newAssets: () => ['POST', `${URL}api/asset`],
  showAssets: (id) => ['GET', `${URL}api/asset/${id}`],
  updateAssets: (id) => ['POST', `${URL}api/asset/${id}`],
  deleteAssets: (id) => ['DELETE', `${URL}api/asset/${id}`],
  getCCTV: () => ['GET', `${URL}api/cctv`],
  getCCTVFootage: () => ['GET', `${URL}api/cctv-footage`],
  // getDivisions: () => ['GET', `${URL}api/division`],
  getAnnotations: () => ['GET', `${URL}api/annotation`],
  getCompliances: () => ['GET', `${URL}api/annotation-compliance`],
  getAnnotationStatistics: () => ['GET', `${URL}api/annotation-statistic`],
  createDemoAsset: () => ['POST', `${URL}api/loaddemo`],

  getReports: () => ['GET', `${URL}api/report`],
  createReport: () => ['POST', `${URL}api/report`],
  showReport: (id) => ['GET', `${URL}api/report/${id}`],
  deleteReport: (id) => ['DELETE', `${URL}api/report/${id}`],

  getStoredReport: () => ['GET', `${URL}api/qualityreport`],
  createStoredReport: (uuid) => ['POST', `${URL}api/storedreport/${uuid}`],
  getSiteReport: (id, media_type) => ['GET', `${URL}api/asset/${id}/${media_type}`],

  getQualityProgress: () => ['GET', `${URL}api/qualityprogress`],
  createQualityProgress: (uuid) => ['POST', `${URL}api/qualityprogress/${uuid}`],

  getPreqlassic: () => ['GET', `${URL}api/preqlassic`],
  getPreqlassicSummary: () => ['GET', `${URL}api/preqlassic-summary`],
  createPreqlassic: (uuid) => ['POST', `${URL}api/preqlassic/${uuid}`],

  getConquas: () => ['GET', `${URL}api/conquas`],

  getUsers: () => ['GET', `${URL}api/users`],
  createUser: () => ['POST', `${URL}api/user`],
  updateUser: (id) => ['POST', `${URL}api/user/${id}`],
  deleteUser: (id) => ['DELETE', `${URL}api/user/${id}`],

  getSeverities: () => ['GET', `${URL}api/severity`],
  createSeverity: (assetTypeId) => ['POST', `${URL}api/severity/${assetTypeId}`],

  getIssues: () => ['GET', `${URL}api/issue`],
  createIssues: (assetTypeId) => ['POST', `${URL}api/issue/${assetTypeId}`],

  getOrganizations: () => ['GET', `${URL}api/organizations`],
  getOrganization: (organizationId) => ['GET', `${URL}api/organization/${organizationId}`],
  getOrganizationAssets: () => ['GET', `${URL}api/organizations-assets`],
  getOrganizationReport: (organizationId) => ['GET', `${URL}api/organization-report/${organizationId}`],

  updateAssetAccess: () => ['POST', `${URL}api/assetaccess`],
  newAssetFile: () => ['POST', `${URL}api/assetfile`],
  getAssetFile: () => ['GET', `${URL}api/assetfile`],
  getAssetFileById: (asset_id) => ['GET', `${URL}api/assetfile/${asset_id}`],
  deleteAssetFile: (id) => ['DELETE', `${URL}api/assetfile/${id}`],
  updateAssetFile: (id) => ['POST', `${URL}api/assetfile/${id}`],

  getAssetFileConversion: () => ['GET', `${URL}api/assetfile-conversion`],
  uploadAssetFileConversion: (id) => ['POST', `${URL}api/assetfile-conversion/${id}`],

  getStorage: () => ['GET', `${URL}api/metrics/storage`],
  getStorageAlert: (id) => ['GET', `${URL}api/storagealert/${id}`],
  newStorageAlert: () => ['POST', `${URL}api/storagealert`],
  updateStorageAlert: (id) => ['POST', `${URL}api/storagealert/${id}`],
  deleteStorageAlert: (id) => ['DELETE', `${URL}api/storagealert/${id}`],

  getWorkflows: () => ['GET', `${URL}api/workflow`],
  showWorkflow: (id) => ['GET', `${URL}api/workflow/${id}`],
  newWorkflow: () => ['POST', `${URL}api/workflow`],
  updateWorkflow: (id) => ['POST', `${URL}api/workflow/${id}`],
  deleteWorkflow: (id) => ['DELETE', `${URL}api/workflow/${id}`],
  createWorkflowTeam: () => ['POST', `${URL}api/workflow-team`], // insert team in workflow
  updateWorkflowTeam: (id) => ['POST', `${URL}api/workflow-team/${id}`],
  deleteWorkflowTeam: (id) => ['DELETE', `${URL}api/workflow-team/${id}`],

  getTeams: () => ['GET', `${URL}api/team`],
  getTeam: (id) => ['GET', `${URL}api/team/${id}`],
  createTeam: () => ['POST', `${URL}api/team`],
  updateTeam: (id) => ['POST', `${URL}api/team/${id}`],
  deleteTeam: (id) => ['DELETE', `${URL}api/team/${id}`],

  getModules: () => ['GET', `${URL}api/module`],
  showModule: (id) => ['GET', `${URL}api/module/${id}`],
  createModule: () => ['POST', `${URL}api/module`],
  updateModule: (id) => ['POST', `${URL}api/module/${id}`],
  deleteModule: (id) => ['DELETE', `${URL}api/module/${id}`],

  getParameters: () => ['GET', `${URL}api/asset-parameter-option`],
  createParameter: () => ['POST', `${URL}api/asset-parameter-option`],
  updateParameter: (id) => ['POST', `${URL}api/asset-parameter-option/${id}`],
  deleteParameter: (id) => ['DELETE', `${URL}api/asset-parameter-option/${id}`],
};
