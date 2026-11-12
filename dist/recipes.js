// Recipes contain only data. Shared actions live in animation.js; the runner knows no recipe IDs.
export const recipes=[
{id:'moka',version:1,name:'摩卡奶咖',subtitle:'温暖、柔软，慢一点的早晨',tag:'暖心经典',color:'peach',method:'moka',base:240,range:[180,300],equipment:'摩卡壶 · 手动磨豆机 · 奶缸 ≥ 450ml',steps:[
{action:'grind',title:'从新鲜研磨开始',text:'研磨 {dose}g 咖啡豆，使用中细研磨，比意式浓缩略粗。',tip:'粉重记录自己的粉篮容量；松散装满刮平，不压粉。',requires:[],produces:'grounds'},
{action:'water',title:'给安全阀留出空间',text:'冷壶下座加入常温清水，水位停在安全阀下方。',tip:'按实际安全阀位置加水，下壶不能加牛奶。',produces:'water'},
{action:'basket',title:'装满、刮平，不压粉',text:'咖啡粉松散装满粉篮，刮平边缘，清理壶口余粉。',tip:'不要为了调整杯量而少装半篮或压粉。',requires:['grounds'],produces:'basket'},
{action:'assemble',title:'轻轻组合起来',text:'装好粉篮，检查密封圈与滤网。握住壶身，对齐螺纹拧紧。',tip:'不用手柄发力；热壶或仍有压力时不能打开。',requires:['basket','water'],produces:'ready'},
{action:'heat',title:'等咖啡慢慢流出来',text:'兼容炉具小到中火，全程观察出液；收集完成、出液结束时及时离火。',tip:'以出液状态判断，不设固定倒计时；异常排气时关火，完全冷却后检查。',requires:['ready'],produces:'coffee'},
{action:'froth',title:'让牛奶变得柔软',text:'单独温热 {milk}ml 牛奶，不煮沸。打奶头浸入后开机，先关机再取出。',tip:'奶缸至少留出一半空间。奶泡量因工具而异，少量即可。',produces:'milk'},
{action:'pourCoffee',title:'先给杯子一点咖啡',text:'量取约 {coffee}ml 摩卡咖啡倒入杯中，多余咖啡另留。',tip:'摩卡壶按完整粉篮冲煮；这里只调整入杯量。',requires:['coffee'],add:'coffee'},
{action:'pourMilk',title:'倒入温奶，完成这杯',text:'缓缓加入 {milk}ml 温奶和少量奶泡，接近杯口时提前停止。',tip:'容量包含预留空间，实际奶泡体积仍需观察。',requires:['milk'],add:'milk'}]},
{id:'filter',version:1,name:'日常手冲',subtitle:'明亮香气，一圈一圈慢慢展开',tag:'清爽纯粹',color:'sage',method:'filter',base:240,range:[200,320],equipment:'滤杯与滤纸 · 手冲壶 · 磨豆机 · 电子秤',steps:[
{action:'grind',title:'磨出今天的香气',text:'称取 {dose}g 咖啡豆，中等研磨。准备约 {water}g 冲煮用水。',tip:'以豆水比 1:15 起步；成品量估算已考虑咖啡粉吸水。',produces:'grounds'},
{action:'filter',title:'给滤杯做好准备',text:'放好滤纸，用热水润湿并预热滤杯。倒掉润洗水，再加入咖啡粉并摇平。',tip:'润洗水不计入冲煮水量；使用耐热器具，小心烫伤。',requires:['grounds'],produces:'ready'},
{action:'bloom',title:'先让咖啡醒一醒',text:'均匀注入 {bloom}g 热水，浸湿全部咖啡粉；倒好后开始 30 秒闷蒸。',tip:'建议水温 90–94°C，可按豆子调整。计时由你点击开始。',seconds:30,timerLabel:'已注水，开始闷蒸',requires:['ready'],produces:'bloomed'},
{action:'drip',title:'绕圈，慢慢注水',text:'从中心向外缓缓绕圈，分段注水至电子秤累计 {water}g（包含闷蒸水）。',tip:'避免直接冲滤纸边缘；滤杯接近满时暂停注水。',requires:['bloomed'],produces:'brewed'},
{action:'wait',title:'等最后的香气落下',text:'等待水流明显变慢，再移走滤杯。成品约 {target}ml，以实际出液为准。',tip:'不强制固定时长；流速取决于研磨、滤杯和注水。',requires:['brewed'],add:'filter'}]},
{id:'iced',version:1,name:'冰摩卡奶咖',subtitle:'冰块轻响，给午后一口清凉',tag:'冰爽时刻',color:'blue',method:'iced',base:300,range:[240,360],equipment:'摩卡壶 · 磨豆机 · 耐热杯 · 冰块',steps:[]}
];
recipes[2].steps=[...recipes[0].steps.slice(0,5),{action:'ice',title:'装进一杯清凉',text:'杯中加入约 {ice}g 冰块，为牛奶和咖啡留出空间。',tip:'冰块占用体积为估算值，不同形状会有差异。',add:'ice'},{action:'pourMilk',title:'先倒入冷牛奶',text:'倒入 {milk}ml 冷牛奶，冰块会轻轻浮起。',tip:'使用可直接饮用的冷藏奶。',add:'milk'},{action:'pourCoffee',title:'让咖啡慢慢融进去',text:'将 {coffee}ml 摩卡咖啡稍放凉后缓慢倒入，轻轻混匀。',tip:'使用耐热杯，避免普通玻璃骤冷骤热。',requires:['coffee'],add:'coffee'}];
export const actions=['grind','water','basket','assemble','heat','froth','pourCoffee','pourMilk','filter','bloom','drip','wait','ice'];
export function makeConfig(recipe,target=recipe.base,capacity=350,dose=16,preground=false){
 target=Number(target);capacity=Number(capacity);dose=Number(dose);
 if(!Number.isFinite(target)||target<recipe.range[0]||target>recipe.range[1])throw Error('请在支持范围内选择饮品量。');
 if(!Number.isFinite(capacity)||capacity<150||capacity>1000)throw Error('杯子容量应为 150–1000ml。');
 if(!Number.isFinite(dose)||dose<5||dose>40)throw Error('请填写实际粉篮的粉重（5–40g）。');
 let c={target,capacity,dose,preground};
 if(recipe.method==='filter'){c.dose=Math.round(target/13*10)/10;c.water=Math.round(c.dose*15);c.bloom=Math.round(c.dose*2);c.coffee=target;c.milk=0;c.ice=0;}
 else if(recipe.method==='iced'){c.coffee=60;c.ice=Math.round(target*.23);c.milk=Math.round(target-c.coffee-c.ice/0.92);}
 else {c.coffee=60;c.milk=target-60;c.ice=0;}
 c.occupied=c.coffee+c.milk+c.ice/0.92;
 if(c.occupied>capacity*.9)throw Error(`建议使用至少 ${Math.ceil(c.occupied/.9/10)*10}ml 的杯子，留出操作空间。`);
 return c;
}
export function validateRecipe(r){const have=new Set();for(const s of r.steps){if(!actions.includes(s.action))throw Error('未知动画 '+s.action);for(const key of s.requires||[])if(!have.has(key))throw Error(r.id+' 缺少 '+key);if(s.produces)have.add(s.produces);}return true;}
export function cupState(steps,index,c){return steps.slice(0,index).reduce((v,s)=>{if(s.add)v[s.add]=s.add==='filter'?c.target:c[s.add];return v;},{coffee:0,milk:0,ice:0,filter:0});}
recipes.forEach(validateRecipe);
