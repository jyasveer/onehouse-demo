const map = {};
const list = [];

const print = (action) => {
    console.log('action', action);
    console.log('map', map);
    console.log('list', list);
    console.log('length of list', list.length);
}

const insert = val => {
    const newLength = list.push(val);
    map[val] = newLength - 1;
    print('insert');
}

const remove = val => {
    const index = map[val];
    const length = list.length;
    const itemAtLastIndex = list[length - 1];

    // update the map and the list
    delete map[val];
    list[index] = list[length - 1];
    map[itemAtLastIndex] = index;

    // update the length of the list to restrict access
    // need to do garbage collection
    list.length = length - 1;
    print('remove');
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const random = () => {
    const length = list.length;
    // this random integer has to be less than the length of the list
    // need to enhance it
    // 0 and 1, 10, 
    const randomInteger = getRandomInt(0, length - 1);

    console.log('random value from the list', list[randomInteger]);
}

insert('abc');
insert('def');
insert('ghi');
random();
remove('def');
random();
insert('jkl');