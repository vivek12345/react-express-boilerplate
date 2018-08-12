export default {
  isProduction: process.env.REACT_APP_ENV === 'production',
  GA_ID: process.env.REACT_APP_GA_ID,
  REQUEST_TIMEOUT: process.env.DASHBOARD_APP_REQUEST_TIMEOUT || 50000,
  DASHBOARD_APP_FRONT_END_URL: process.env.DASHBOARD_APP_FRONT_END_URL,
  GOOGLE_CLIENT_ID: process.env.DASHBOARD_APP_GOOGLE_CLIENT_ID,
  PRODUCT_TABLE_ROW_ID: 'id',
  GRAPH_TABLE_ROW_ID: 'id',
  PRODUCT_DETAIL_TABLE_ROW_ID: 'code',
  PRODUCT_TABLE_COLUMNS: {
    id: 'Product Id',
    code: 'Product Code'
  },
  GRAPH_TABLE_COLUMNS: {
    version: 'Version',
    id: 'Graph Id'
  },
  PRODUCT_DETAIL_TABLE_COLUMNS: {
    code: 'Product Code',
    maxAmount: 'Max Amount',
    rate: 'Rate',
    id: 'Product Id'
  }
};
