import assert from 'node:assert/strict';
import {recipes,makeConfig,validateRecipe,cupState} from '../dist/recipes.js';
import {scene} from '../dist/animation.js';
for(const r of recipes){assert.equal(validateRecipe(r),true);for(const target of [r.range[0],r.base,r.range[1]]){const c=makeConfig(r,target,500);assert(c.occupied<=c.capacity*.9);for(let i=0;i<r.steps.length;i++){const before=cupState(r.steps,i,c);for(const t of [0,.5,1]){const svg=scene(r.steps[i],t,c,before);assert(!/NaN|undefined/.test(svg),r.id+':'+i);}}const final=cupState(r.steps,r.steps.length,c);assert(Math.abs(final.coffee+final.milk+final.filter+final.ice/.92-c.occupied)<.1);}}
assert.throws(()=>makeConfig(recipes[0],300,250));assert.throws(()=>makeConfig(recipes[0],NaN));assert.throws(()=>validateRecipe({id:'bad',steps:[{action:'heat',requires:['ready']}]}));
assert.equal(makeConfig(recipes[0],180).dose,makeConfig(recipes[0],300).dose);
const a=scene({action:'ice',add:'ice'},1,makeConfig(recipes[2]),{coffee:0,milk:0,filter:0,ice:0});const b=scene({action:'ice',add:'ice'},1,makeConfig(recipes[2]),{coffee:0,milk:0,filter:0,ice:0});assert.notEqual(a.match(/id="glassClip-[^"]+/)[0],b.match(/id="glassClip-[^"]+/)[0]);
console.log('Passed: recipe dependencies, capacity bounds, scaling, accumulated contents, all action frames, unique SVG IDs.');
