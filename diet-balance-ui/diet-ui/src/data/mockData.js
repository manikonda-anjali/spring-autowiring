// ─── FOOD DATABASE ───────────────────────────────────────────────
export const FOODS = [
  { id:'f1', name:'Spinach (Raw)', category:'vegetable', serving:'100g', calories:23, protein:2.9, carbs:3.6, fats:0.4, fiber:2.2, vitaminA:469, vitaminC:28, vitaminD:0, calcium:99, iron:2.7, zinc:0.5, vitaminB12:0, folate:194, magnesium:79, potassium:558, iodine:3 },
  { id:'f2', name:'Whole Milk', category:'dairy', serving:'200ml', calories:122, protein:6.4, carbs:9.4, fats:6.6, fiber:0, vitaminA:68, vitaminC:0, vitaminD:2.4, calcium:240, iron:0.1, zinc:0.9, vitaminB12:0.8, folate:10, magnesium:20, potassium:320, iodine:46 },
  { id:'f3', name:'Boiled Egg', category:'protein', serving:'50g', calories:78, protein:6.3, carbs:0.6, fats:5.3, fiber:0, vitaminA:75, vitaminC:0, vitaminD:1.1, calcium:25, iron:0.9, zinc:0.6, vitaminB12:0.6, folate:22, magnesium:6, potassium:63, iodine:12 },
  { id:'f4', name:'Salmon (100g)', category:'protein', serving:'100g', calories:208, protein:20, carbs:0, fats:13, fiber:0, vitaminA:12, vitaminC:0, vitaminD:11, calcium:12, iron:0.3, zinc:0.4, vitaminB12:3.2, folate:25, magnesium:27, potassium:490, iodine:14 },
  { id:'f5', name:'Fortified Oats', category:'grain', serving:'40g', calories:148, protein:5, carbs:27, fats:2.5, fiber:4, vitaminA:0, vitaminC:0, vitaminD:0, calcium:120, iron:4, zinc:1.2, vitaminB12:0.5, folate:80, magnesium:50, potassium:140, iodine:5 },
  { id:'f6', name:'Orange', category:'fruit', serving:'130g', calories:62, protein:1.2, carbs:15.4, fats:0.2, fiber:3.1, vitaminA:11, vitaminC:70, vitaminD:0, calcium:52, iron:0.1, zinc:0.1, vitaminB12:0, folate:40, magnesium:11, potassium:237, iodine:0 },
  { id:'f7', name:'Lentils (Boiled)', category:'protein', serving:'100g', calories:116, protein:9, carbs:20, fats:0.4, fiber:7.9, vitaminA:1, vitaminC:1.5, vitaminD:0, calcium:19, iron:3.3, zinc:1.3, vitaminB12:0, folate:181, magnesium:36, potassium:369, iodine:2 },
  { id:'f8', name:'Banana', category:'fruit', serving:'120g', calories:107, protein:1.3, carbs:27, fats:0.4, fiber:3.1, vitaminA:3, vitaminC:10, vitaminD:0, calcium:5, iron:0.3, zinc:0.2, vitaminB12:0, folate:24, magnesium:32, potassium:422, iodine:1 },
  { id:'f9', name:'Chicken Breast', category:'protein', serving:'100g', calories:165, protein:31, carbs:0, fats:3.6, fiber:0, vitaminA:8, vitaminC:0, vitaminD:0, calcium:11, iron:0.9, zinc:1, vitaminB12:0.3, folate:4, magnesium:29, potassium:256, iodine:5 },
  { id:'f10', name:'Broccoli', category:'vegetable', serving:'100g', calories:34, protein:2.8, carbs:6.6, fats:0.4, fiber:2.6, vitaminA:31, vitaminC:89, vitaminD:0, calcium:47, iron:0.7, zinc:0.4, vitaminB12:0, folate:63, magnesium:21, potassium:316, iodine:3 },
  { id:'f11', name:'Almonds (30g)', category:'snack', serving:'30g', calories:174, protein:6.3, carbs:6, fats:15, fiber:3.5, vitaminA:0, vitaminC:0, vitaminD:0, calcium:76, iron:1, zinc:0.9, vitaminB12:0, folate:27, magnesium:77, potassium:210, iodine:0 },
  { id:'f12', name:'Greek Yogurt', category:'dairy', serving:'150g', calories:89, protein:15, carbs:4.7, fats:0.4, fiber:0, vitaminA:20, vitaminC:0, vitaminD:0, calcium:187, iron:0.1, zinc:0.9, vitaminB12:0.7, folate:7, magnesium:15, potassium:240, iodine:50 },
  { id:'f13', name:'Sweet Potato', category:'vegetable', serving:'100g', calories:86, protein:1.6, carbs:20, fats:0.1, fiber:3, vitaminA:961, vitaminC:2.4, vitaminD:0, calcium:30, iron:0.6, zinc:0.3, vitaminB12:0, folate:11, magnesium:25, potassium:337, iodine:1 },
  { id:'f14', name:'Brown Rice', category:'grain', serving:'150g', calories:218, protein:4.5, carbs:45, fats:1.8, fiber:3.5, vitaminA:0, vitaminC:0, vitaminD:0, calcium:20, iron:1, zinc:1.2, vitaminB12:0, folate:8, magnesium:84, potassium:154, iodine:1 },
  { id:'f15', name:'Sardines in Oil', category:'protein', serving:'100g', calories:208, protein:24.6, carbs:0, fats:11.5, fiber:0, vitaminA:27, vitaminC:0, vitaminD:4.8, calcium:382, iron:2.9, zinc:1.3, vitaminB12:8.9, folate:10, magnesium:39, potassium:397, iodine:14 },
  { id:'f16', name:'Carrot', category:'vegetable', serving:'100g', calories:41, protein:0.9, carbs:9.6, fats:0.2, fiber:2.8, vitaminA:835, vitaminC:6, vitaminD:0, calcium:33, iron:0.3, zinc:0.2, vitaminB12:0, folate:19, magnesium:12, potassium:320, iodine:2 },
  { id:'f17', name:'Tofu (Firm)', category:'protein', serving:'100g', calories:76, protein:8, carbs:1.9, fats:4.8, fiber:0.3, vitaminA:0, vitaminC:0.1, vitaminD:0, calcium:350, iron:1.6, zinc:0.8, vitaminB12:0, folate:15, magnesium:30, potassium:150, iodine:3 },
  { id:'f18', name:'Apple', category:'fruit', serving:'182g', calories:95, protein:0.5, carbs:25, fats:0.3, fiber:4.4, vitaminA:5, vitaminC:8.4, vitaminD:0, calcium:11, iron:0.2, zinc:0.1, vitaminB12:0, folate:5, magnesium:9, potassium:195, iodine:0 },
  { id:'f19', name:'Kidney Beans', category:'protein', serving:'100g', calories:127, protein:8.7, carbs:22.8, fats:0.5, fiber:6.4, vitaminA:0, vitaminC:1.2, vitaminD:0, calcium:28, iron:2.9, zinc:1, vitaminB12:0, folate:130, magnesium:45, potassium:405, iodine:2 },
  { id:'f20', name:'Peanut Butter', category:'fat', serving:'30g', calories:188, protein:8, carbs:6, fats:16, fiber:1.9, vitaminA:0, vitaminC:0, vitaminD:0, calcium:17, iron:0.6, zinc:0.9, vitaminB12:0, folate:27, magnesium:50, potassium:200, iodine:0 },
]

// ─── RDA TABLE ────────────────────────────────────────────────────
export const RDA = {
  child_4_8:              { calories:1400, protein:19, iron:10, calcium:1000, vitaminD:15, vitaminC:25, vitaminA:400, vitaminB12:1.2, zinc:5,  folate:200, magnesium:130, potassium:2300, iodine:90  },
  adolescent_male_9_13:   { calories:2200, protein:34, iron:8,  calcium:1300, vitaminD:15, vitaminC:45, vitaminA:600, vitaminB12:1.8, zinc:8,  folate:300, magnesium:240, potassium:2500, iodine:120 },
  adolescent_female_9_13: { calories:2000, protein:34, iron:8,  calcium:1300, vitaminD:15, vitaminC:45, vitaminA:600, vitaminB12:1.8, zinc:8,  folate:300, magnesium:240, potassium:2300, iodine:120 },
  adolescent_male_14_18:  { calories:2800, protein:52, iron:11, calcium:1300, vitaminD:15, vitaminC:75, vitaminA:900, vitaminB12:2.4, zinc:11, folate:400, magnesium:410, potassium:3000, iodine:150 },
  adolescent_female_14_18:{ calories:2200, protein:46, iron:15, calcium:1300, vitaminD:15, vitaminC:65, vitaminA:700, vitaminB12:2.4, zinc:9,  folate:400, magnesium:360, potassium:2300, iodine:150 },
  adult_male:             { calories:2500, protein:56, iron:8,  calcium:1000, vitaminD:15, vitaminC:90, vitaminA:900, vitaminB12:2.4, zinc:11, folate:400, magnesium:400, potassium:3400, iodine:150 },
  adult_female:           { calories:2000, protein:46, iron:18, calcium:1000, vitaminD:15, vitaminC:75, vitaminA:700, vitaminB12:2.4, zinc:8,  folate:400, magnesium:310, potassium:2600, iodine:150 },
}

export function getRDA(age, gender) {
  if (age <= 8)  return RDA.child_4_8
  if (age <= 13) return gender === 'female' ? RDA.adolescent_female_9_13 : RDA.adolescent_male_9_13
  if (age <= 18) return gender === 'female' ? RDA.adolescent_female_14_18 : RDA.adolescent_male_14_18
  return gender === 'female' ? RDA.adult_female : RDA.adult_male
}

// ─── MOCK TODAY'S LOG ─────────────────────────────────────────────
export const INITIAL_LOGS = [
  { id:'l1', mealType:'breakfast', foodId:'f5', foodName:'Fortified Oats', quantity:1, calories:148 },
  { id:'l2', mealType:'breakfast', foodId:'f2', foodName:'Whole Milk', quantity:1, calories:122 },
  { id:'l3', mealType:'lunch', foodId:'f9', foodName:'Chicken Breast', quantity:1, calories:165 },
  { id:'l4', mealType:'lunch', foodId:'f10', foodName:'Broccoli', quantity:1, calories:34 },
  { id:'l5', mealType:'snack', foodId:'f6', foodName:'Orange', quantity:1, calories:62 },
]

// ─── MOCK WEEKLY DATA ─────────────────────────────────────────────
export const WEEKLY_DATA = [
  { day:'Mon', calories:1820, protein:62, iron:11, calcium:780, vitaminD:4, score:68 },
  { day:'Tue', calories:2100, protein:71, iron:14, calcium:920, vitaminD:6, score:74 },
  { day:'Wed', calories:1650, protein:54, iron:9,  calcium:640, vitaminD:3, score:58 },
  { day:'Thu', calories:2350, protein:80, iron:16, calcium:1050, vitaminD:8, score:82 },
  { day:'Fri', calories:1950, protein:65, iron:12, calcium:850, vitaminD:5, score:71 },
  { day:'Sat', calories:2200, protein:73, iron:13, calcium:960, vitaminD:7, score:76 },
  { day:'Sun', calories:0,    protein:0,  iron:0,  calcium:0,   vitaminD:0, score:0  },
]

// ─── MOCK USERS (ADMIN) ───────────────────────────────────────────
export const MOCK_USERS = [
  { id:'u1', name:'Priya Sharma',   email:'priya@email.com',   age:14, gender:'female', role:'user',  joined:'2025-11-10', score:62, deficiencies:['Iron','Vitamin D','Calcium'] },
  { id:'u2', name:'Arjun Mehta',    email:'arjun@email.com',   age:11, gender:'male',   role:'user',  joined:'2025-12-01', score:78, deficiencies:['Vitamin B12'] },
  { id:'u3', name:'Sneha Patel',    email:'sneha@email.com',   age:16, gender:'female', role:'user',  joined:'2026-01-05', score:45, deficiencies:['Iron','Folate','Iodine'] },
  { id:'u4', name:'Rohan Gupta',    email:'rohan@email.com',   age:8,  gender:'male',   role:'user',  joined:'2026-01-18', score:85, deficiencies:[] },
  { id:'u5', name:'Ananya Singh',   email:'ananya@email.com',  age:13, gender:'female', role:'user',  joined:'2026-02-02', score:55, deficiencies:['Calcium','Vitamin D'] },
  { id:'u6', name:'Dev Kumar',      email:'dev@email.com',     age:17, gender:'male',   role:'user',  joined:'2026-02-10', score:70, deficiencies:['Zinc'] },
  { id:'u7', name:'Kavya Nair',     email:'kavya@email.com',   age:10, gender:'female', role:'user',  joined:'2026-02-14', score:38, deficiencies:['Iron','Vitamin D','Vitamin B12','Calcium'] },
  { id:'u8', name:'Ishaan Verma',   email:'ishaan@email.com',  age:15, gender:'male',   role:'user',  joined:'2026-02-20', score:91, deficiencies:[] },
]

// ─── DEFICIENCY ANALYTICS ─────────────────────────────────────────
export const DEFICIENCY_ANALYTICS = [
  { nutrient:'Iron',      count:42, percentage:52.5 },
  { nutrient:'Vitamin D', count:38, percentage:47.5 },
  { nutrient:'Calcium',   count:31, percentage:38.8 },
  { nutrient:'Folate',    count:24, percentage:30.0 },
  { nutrient:'Vitamin B12', count:19, percentage:23.8 },
  { nutrient:'Iodine',    count:17, percentage:21.3 },
  { nutrient:'Zinc',      count:14, percentage:17.5 },
  { nutrient:'Magnesium', count:11, percentage:13.8 },
]

// ─── NUTRIENT META ────────────────────────────────────────────────
export const NUTRIENT_META = {
  calories:   { label:'Calories',    unit:'kcal', key:'calories' },
  protein:    { label:'Protein',     unit:'g',    key:'protein' },
  iron:       { label:'Iron',        unit:'mg',   key:'iron' },
  calcium:    { label:'Calcium',     unit:'mg',   key:'calcium' },
  vitaminD:   { label:'Vitamin D',   unit:'mcg',  key:'vitaminD' },
  vitaminC:   { label:'Vitamin C',   unit:'mg',   key:'vitaminC' },
  vitaminA:   { label:'Vitamin A',   unit:'mcg',  key:'vitaminA' },
  vitaminB12: { label:'Vitamin B12', unit:'mcg',  key:'vitaminB12' },
  zinc:       { label:'Zinc',        unit:'mg',   key:'zinc' },
  folate:     { label:'Folate',      unit:'mcg',  key:'folate' },
  magnesium:  { label:'Magnesium',   unit:'mg',   key:'magnesium' },
  potassium:  { label:'Potassium',   unit:'mg',   key:'potassium' },
  iodine:     { label:'Iodine',      unit:'mcg',  key:'iodine' },
}

export const RADAR_KEYS = ['iron','calcium','vitaminD','vitaminC','vitaminA','vitaminB12','zinc','folate']
