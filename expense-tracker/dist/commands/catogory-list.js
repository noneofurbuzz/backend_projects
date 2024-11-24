import { readCategories } from '../utils/categoriesUtils.js';
export default () => {
    let parsedCategories = readCategories();
    if (parsedCategories.length !== 0) {
        console.log('Existing categories: ');
        for (let i = 0; i < parsedCategories.length; i = i + 1) {
            console.log(`${i + 1}. ${parsedCategories[i].name}`);
        }
    }
    else {
        console.error('No categories exist');
    }
};
//# sourceMappingURL=catogory-list.js.map