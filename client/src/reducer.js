export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case 'SET_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.product],
      };
    case 'UNIQUE':
      return {
        ...state,
        basket: [
          ...new Map(
            state.basket.map((item) => [JSON.stringify(item), item])
          ).values(),
        ],
      };
    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        basket: state.basket.filter((ele) => ele.id !== action.id),
      };
    default:
      return state;
  }
};
export const initialState = {
  basket: [],
};
