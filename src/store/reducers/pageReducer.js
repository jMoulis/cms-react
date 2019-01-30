export const FETCH_PAGES = 'FETCH_PAGES';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';

export const CREATE_PAGE = 'CREATE_PAGE';
export const CREATE_PAGE_FAILURE = 'CREATE_PAGE_FAILURE';
export const CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS';

const initialState = {
  pagesRequest: {
    pages: null,
    isFetching: false,
    error: null,
  },
  pageCreateRequest: {
    page: null,
    isCreating: false,
    error: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PAGES: {
      return {
        ...state,
        pagesRequest: {
          ...state.pagesRequest,
          isFetching: true,
        },
      };
    }
    case FETCH_PAGES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        pagesRequest: {
          isFetching: false,
          pages: null,
          error: {
            message: payload,
          },
        },
      };
    }
    case FETCH_PAGES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        pagesRequest: {
          pages: payload,
          isFetching: false,
          error: null,
        },
      };
    }
    case CREATE_PAGE: {
      return {
        ...state,
        pageCreateRequest: {
          ...state.pageCreateRequest,
          isCreating: true,
        },
      };
    }
    case CREATE_PAGE_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        pageCreateRequest: {
          page: null,
          isCreating: false,
          error: payload,
        },
      };
    }
    case CREATE_PAGE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        pageCreateRequest: {
          page: payload,
          isCreating: false,
          error: null,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

export const fetchPages = () => ({
  type: FETCH_PAGES,
});
export const fetchPagesSuccess = payload => ({
  type: FETCH_PAGES_SUCCESS,
  payload,
});
export const fetchPagesFailure = payload => ({
  type: FETCH_PAGES_FAILURE,
  payload,
});

export const createPage = values => ({
  type: CREATE_PAGE,
  values,
});
export const createPageSuccess = payload => ({
  type: CREATE_PAGE_SUCCESS,
  payload,
});
export const createPageFailure = payload => ({
  type: CREATE_PAGE_FAILURE,
  payload,
});
