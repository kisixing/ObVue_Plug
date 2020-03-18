import { MutableRefObject } from "react";
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";
import { IPrenatalVisit, IPregnancy } from "@lianmed/f_types/lib/m";
import { IItemData } from "@lianmed/pages/lib/Ctg/Layout";
type t = { [x in keyof IItemData]?: IItemData[x] }
export interface IPropsWithData  {
    itemData?: t
    mutableSuit?: MutableRefObject<Suit>
}