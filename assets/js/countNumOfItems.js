// Count number of items in localhost objects located in product array
export function countNumOfItems(storage) {
  const numberOfItemArr = storage?.map((el) => el.quantity);

  return numberOfItemArr?.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
}
