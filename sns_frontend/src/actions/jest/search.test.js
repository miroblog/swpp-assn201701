import * as types from '../ActionTypes';
import * as actions from '../index';

describe( 'show result', () => {
  it('should create an action to show result', () => {
    const users = [];
    const expectedAction = {
      type: types.SHOW_RESULT,
      users
    }
    expect( actions.showResult(users) ).toEqual(expectedAction)
  })
} )

describe( 'search friends', () => {
  it('should create an action to search friends', () => {
    const searchValue = 'search value';
    const expectedAction = {
      type: types.SEARCH_FRIENDS,
      searchValue
    }
    expect( actions.searchFriends(searchValue) ).toEqual(expectedAction)
  })
} )

describe( 'search result close', () => {
  it('should create an action to search result close', () => {
    const expectedAction = {
      type: types.SEARCH_RESULT_CLOSE
    }
    expect( actions.searchResultClose() ).toEqual(expectedAction)
  })
} )
