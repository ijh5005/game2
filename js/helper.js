const helper = {
  hasTwoInArray: (array, arrayToCheckIn) => {
    let numberInside = 0;
    array.forEach(arr => {
      if (arrayToCheckIn.includes(arr)) {
        numberInside++
      }
    })
    return (numberInside === 2);
  },
  removedDoublesFromArray: (arr) => {
    const noDublicates = [];
    arr.forEach(item => {
      if (!noDublicates.includes(item)) {
        noDublicates.push(item);
      }
    })
    return noDublicates;
  },
  isSelected: () => {
    return $(".tool.selected").length === 1;
  }
}
