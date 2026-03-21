const tomatoModel = await import('@/scene/models/plants/tomato');
const cucumberModel = await import('@/scene/models/plants/cucumber');
const vineModel = await import('@/scene/models/plants/vine');
const roseModel = await import('@/scene/models/decoration/rose');
const statueModel = await import('@/scene/models/decoration/statue');
const wellModel = await import('@/scene/models/structures/well');
import models from '@/store/models';

export const setupRest = async () => {
  models.tomatoModel = await tomatoModel.default();
  models.cucumberModel = await cucumberModel.default();
  models.vineModel = await vineModel.default();
  models.roseModel = await roseModel.default();
  models.statueModel = await statueModel.default();
  models.wellModel = await wellModel.default();
};
