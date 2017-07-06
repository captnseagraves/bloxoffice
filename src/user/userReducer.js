const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {

  if (action.type === 'TICKET_PURCHASED')
  {
    console.log('in the reducer');
    return Object.assign({}, state, {
      transactionObject: action.data
    })
  }

if (action.type === 'USER_UPDATED')
{
  console.log('in the reducer');
  return Object.assign({}, state, {
    transactionObject: action.data
  })
}

  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }


  return state
}

export default userReducer
