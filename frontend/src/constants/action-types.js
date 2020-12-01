import createAsyncAction from '../utils/actions';

export const API_REQUEST = 'API_REQUEST';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const MULTIPLE_API_REQUEST = 'MULTIPLE_API_REQUEST';
export const FETCH_PAGES = createAsyncAction('FETCH_PAGES');
export const FETCH_COMPONENTS = createAsyncAction('FETCH_COMPONENTS');
export const FETCH_WIZARD = createAsyncAction('FETCH_WIZARD');
export const SET_WIZARD_STEP = 'SET_WIZARD_STEP';
export const CLEAR_WIZARD = 'CLEAR_WIZARD';
export const FETCH_WIZARD_PREREQUISITES = createAsyncAction('FETCH_WIZARD_PREREQUISITES');
export const HIDE_PREQUISITE_MODAL = 'HIDE_PREQUISITE_MODAL';
export const LOGIN = createAsyncAction('LOGIN');
export const FETCH_PROGRESS_STEPS = createAsyncAction('FETCH_PROGRESS_STEPS');
export const HIDE_LOG = 'HIDE_LOG';
export const SHOW_LOG_MODAL = 'SHOW_LOG_MODAL';
export const SHOW_LOG_WARNING_DIALOG = 'SHOW_LOG_WARNING_DIALOG';
export const DEPLOY = createAsyncAction('DEPLOY');
export const STORE_PAGE_NAME = 'STORE_PAGE_NAME';
export const STORE_CATEGORY_INDEX = 'STORE_CATEGORY_INDEX';
export const FETCH_SERVER_MESSAGE = createAsyncAction('FETCH_SERVER_MESSAGE');
export const SHOW_PLUGIN_MODAL = 'SHOW_PLUGIN_MODAL';
export const HIDE_PLUGIN_MODAL = 'HIDE_PLUGIN_MODAL';
export const FETCH_PLUGINS = createAsyncAction('GET_PLUGINS');
export const SHOW_UPLOAD_PLUGIN_MODAL = 'SHOW_UPLOAD_PLUGIN_MODAL';
export const HIDE_UPLOAD_PLUGIN_MODAL = 'HIDE_UPLOAD_PLUGIN_MODAL';
export const STORE_FILE = 'STORE_FILE';
export const UPLOAD_FILE = createAsyncAction('UPLOAD_FILE');
export const UPLOAD_FILE_NAME = createAsyncAction('UPLOAD_FILE_NAME');
export const DELETE_PLUGIN = createAsyncAction('DELETE_PLUGIN');
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export const STORE_LOG_URL = 'STORE_LOG_URL';
export const CHANGE_COLLAPSE_MAP = 'CHANGE_COLLAPSE_MAP';
export const HIDE_WIZARD_ERROR_DIALOG = 'HIDE_WIZARD_ERROR_DIALOG';
export const SHOW_HOST_GROUP_ASSIGN_DIALOG = 'SHOW_HOST_GROUP_ASSIGN_DIALOG';
export const SET_SELECTED_ASSIGN_HOST_GROUP_AVAILABILITY_ZONE =
	'SET_SELECTED_ASSIGN_HOST_GROUP_AVAILABILITY_ZONE';
export const SET_SELECTED_ASSIGN_HOST_GROUP_POOL = 'SET_SELECTED_ASSIGN_HOST_GROUP_POOL';
export const HIDE_DEPLOYMENT_ERROR_DIALOG = 'HIDE_DEPLOYMENT_ERROR_DIALOG';
export const SUCCESSFUL_DEPLOYMENT = 'SUCCESSFUL_DEPLOYMENT';
export const RESET_WIZARD = 'RESET_WIZARD';
export const MAP_FORMS_FROM_FILE = 'MAP_FORMS_FROM_FILE';
export const FINISHED_IMPORTING_FILE = 'FINISHED_IMPORTING_FILE';
export const ON_IMPORT_ERROR = 'ON_IMPORT_ERROR';
export const REQUEST_TO_IMPORT_WIZARD = 'REQUEST_TO_IMPORT_WIZARD';
export const HIDE_ERROR_DIALOG = 'HIDE_ERROR_DIALOG';
export const CLEAR_WIZARD_AFTER_DEPLOYMENT = 'CLEAR_WIZARD_AFTER_DEPLOYMENT';
export const CLEAR_WIZARD_AFTER_RESET = 'CLEAR_WIZARD_AFTER_RESET';
export const SET_FIELD_HELP_VISIBILITY = 'SET_FIELD_HELP_VISIBILITY';
export const UPLOAD_WIZARD_FILE = createAsyncAction('UPLOAD_WIZARD_FILE');
export const UPDATE_FILE_UPLOAD_STATUS = 'UPDATE_FILE_UPLOAD_STATUS';
export const SHOW_HELP_FIELDS = 'SHOW_HELP_FIELDS';
export const SHOW_HELP_MESSAGE = 'SHOW_HELP_MESSAGE';
export const SHOW_DEPLOY_JSON = 'SHOW_DEPLOY_JSON';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SHOW_REPORT = createAsyncAction('SHOW_REPORT');
export const HIDE_REPORT = 'HIDE_REPORT';
export const HIDE_REPORT_ERROR_DIALOG = 'HIDE_REPORT_ERROR_DIALOG';
export const DISABLE_RESET = 'DISABLE_RESET';
export const CLEAR_WIZARD_KEEP_CATEGORIES = 'CLEAR_WIZARD_KEEP_CATEGORIES';
export const SET_LOG_MODAL_VISIBLE_AFTER_DEPLOYMENT = 'SET_LOG_MODAL_VISIBLE_AFTER_DEPLOYMENT';
export const SEARCH_TEXT = 'SEARCH_TEXT';
export const CHANGE_COLLAPSE_MAP_STATUS = 'CHANGE_COLLAPSE_MAP_STATUS';
export const CHANGE_COLLAPSE_MAP_IN_SEARCH = 'CHANGE_COLLAPSE_MAP_IN_SEARCH';
export const SHOW_DASHBOARD_CONFIRMATION_DIALOG = 'SHOW_DASHBOARD_CONFIRMATION_DIALOG';
export const ADD_COLLECTION_CHIP = 'ADD_COLLECTION_CHIP';
export const STORE_PAGE_LOG_PARAMS = 'STORE_PAGE_LOG_PARAMS';
export const IS_PAGE_ACTIVE = createAsyncAction('IS_PAGE_ACTIVE');
export const FETCH_LOG = createAsyncAction('FETCH_LOG');
export const CHANGE_LOG_SCROLL_VALUE = 'CHANGE_LOG_SCROLL_VALUE';
export const STORE_PROGRESS_IN_STEPS = 'STORE_PROGRESS_IN_STEPS';
export const STEP_IS_CLICKED = 'STEP_IS_CLICKED';
export const GET_LOG_TEXT = 'GET_LOG_TEXT';
export const CLEAR_DOWNLOAD_LOG_TEXT = 'CLEAR_DOWNLOAD_LOG_TEXT';
export const PROGRESS_STEPS_MAP_READY = 'PROGRESS_STEPS_MAP_READY';
export const IS_WIZARD_ACTIVE = createAsyncAction('IS_WIZARD_ACTIVE');
export const SET_EXAMPLES_CATEGORY = 'SET_EXAMPLES_CATEGORY';
export const ADD_NEW_SUBSECTION = 'ADD_NEW_SUBSECTION';
export const DELETE_SUBSECTION = 'DELETE_SUBSECTION';
export const RESET_AFTER_CHANGING_DYNAMIC_SUBSECTION = 'RESET_AFTER_CHANGING_DYNAMIC_SUBSECTION';
export const CHECK_LIMIT_OF_SUBSECTIONS = 'CHECK_LIMIT_OF_SUBSECTIONS';
export const FETCH_WIZARD_DEPENDENCIES_STATE = createAsyncAction('FETCH_WIZARD_DEPENDENCIES_STATE');
export const RESET_WIZARD_DEPENDENCIES_PARAMS = 'RESET_WIZARD_DEPENDENCIES_PARAMS';
export const GET_RUNNING_PROCESSES = createAsyncAction('GET_RUNNING_PROCESSES');
export const CLOSE_RESTART_SERVER_DIALOG = 'CLOSE_RESTART_SERVER_DIALOG';
export const OPEN_RESTART_SERVER_DIALOG = 'OPEN_RESTART_SERVER_DIALOG';
export const RESTART_SERVER_SERVICES = createAsyncAction('RESTART_SERVER_SERVICES');
export const RESTART_SERVER_SERVICES_FINISHED = 'RESTART_SERVER_SERVICES_FINISHED';
export const ADD_NEW_VALUE_TO_FIELD_EXTENDED_VALUES = 'ADD_NEW_VALUE_TO_FIELD_EXTENDED_VALUES';
export const SET_SELECTED_ASSIGN_HOST_GROUP_RACK = 'SET_SELECTED_ASSIGN_HOST_GROUP_RACK';
export const ON_CHANGE_RACK_SWITCH_STATUS = 'ON_CHANGE_RACK_SWITCH_STATUS';
export const TOGGLE_EXAMPLE_CATEGORIES = 'TOGGLE_EXAMPLE_CATEGORIES';
export const HIDE_PAGES_ERROR_DIALOG = 'HIDE_PAGES_ERROR_DIALOG';
export const SHOW_FIELD_DESCRIPTION_IN_TOOLTIP = 'SHOW_FIELD_DESCRIPTION_IN_TOOLTIP';
export const HANDLE_DELETE_SUBSECTION_CLICK = 'HANDLE_DELETE_SUBSECTION_CLICK';
export const HANDLE_ADD_SUBSECTION_CLICK = 'HANDLE_ADD_SUBSECTION_CLICK';
export const HIDE_DELETE_SUBSECTION_DIALOG = 'HIDE_DELETE_SUBSECTION_DIALOG';
export const HIDE_ADD_SUBSECTION_DIALOG = 'HIDE_ADD_SUBSECTION_DIALOG';
export const HIDE_FETCH_WIZARD_WARNING_DIALOG = 'HIDE_FETCH_WIZARD_WARNING_DIALOG';
export const ASSIGN_WIZARD_DATA = 'ASSIGN_WIZARD_DATA';
export const FETCH_LOG_SIZE = createAsyncAction('FETCH_LOG_SIZE');
export const FETCH_PRODUCT_TYPE = createAsyncAction('FETCH_PRODUCT_TYPE');
export const REPLACE_LOG_MODAL_WITH_LOG_WARNING_DIALOG =
	'REPLACE_LOG_MODAL_WITH_LOG_WARNING_DIALOG';
export const SHOW_RESET_ALLOCATIONS_WARNING = 'SHOW_RESET_ALLOCATIONS_WARNING';
export const SET_IP_RANGE_EDIT_MODE = 'SET_IP_RANGE_EDIT_MODE';
export const SET_FIELDS_ERRORS = 'SET_FIELDS_ERRORS';
export const LOGOUT = createAsyncAction('LOGOUT');
export const SESSION_EXPIRED = 'SESSION_EXPIRED';
export const CLEAR_PAGES_DATA = 'CLEAR_PAGES_DATA';
export const FETCH_USER_INFO = createAsyncAction('FETCH_USER_INFO');
export const VALIDATE_HTTP_COOKIE = 'VALIDATE_HTTP_COOKIE';
export const UPDATE_FORM_VISABILITY = 'UPDATE_FORM_VISABILITY';
export const UPDATE_PREREQUISITES_VISABILITY = 'UPDATE_PREREQUISITES_VISABILITY';
export const CLEAR_LAST_CHANGED_FIELD = 'CLEAR_LAST_CHANGED_FIELD';
