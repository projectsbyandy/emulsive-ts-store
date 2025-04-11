import { type CarouselItem, ProductOverview } from "@e2e-shared/models";
import { ILoadable } from "../common/ILoadable";

export interface IHome extends ILoadable {
    getIntroContent(): Promise<{heading: string; introBody: string}>;
    getFeaturedProductOverviews(): Promise<ProductOverview[]>;
    getAllCarouselDetail(expectedImageCount: number): Promise<CarouselItem[]>;
    selectProductLink(): Promise<void>;
}