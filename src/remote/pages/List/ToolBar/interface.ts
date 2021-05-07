import { MutableRefObject } from "react";
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";
import { IPrenatalVisit, IPregnancy } from "@lianmed/f_types/lib/m";
import { ICtgLayoutItem } from "@lianmed/pages/lib/Ctg/Layout";
type t = { [x in keyof ICtgLayoutItem]?: ICtgLayoutItem[x] }
export interface IPropsWithData  {
    itemData?: t
    mutableSuit?: MutableRefObject<Suit>
}