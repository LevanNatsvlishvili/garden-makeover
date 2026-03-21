const tomatoModel = await import('@/scene/models/plants/tomato');
const cucumberModel = await import('@/scene/models/plants/cucumber');
const vineModel = await import('@/scene/models/plants/vine');
const roseModel = await import('@/scene/models/decoration/rose');
const statueModel = await import('@/scene/models/decoration/statue');
const wellModel = await import('@/scene/models/structures/well');
import models from '@/store/models';

export const setupRest = async () => {
  models.tomatoModel = await import('@/scene/models/plants/tomato');
  models.cucumberModel = await import('@/scene/models/plants/cucumber');
  models.vineModel = await import('@/scene/models/plants/vine');
  models.roseModel = await import('@/scene/models/decoration/rose');
  models.statueModel = await import('@/scene/models/decoration/statue');
  models.wellModel = await import('@/scene/models/structures/well');
};
