import { type CarouselItem, ProductOverview } from "@e2e-shared/models";
import { ILoadVerification } from "../common/ILoadVerification";

export interface IHome extends ILoadVerification {
    getIntroContent(): Promise<{heading: string; introBody: string}>;
    getFeaturedProductOverviews(): Promise<ProductOverview[]>;
    getAllCarouselDetail(expectedImageCount: number): Promise<CarouselItem[]>;
    selectProductLink(): Promise<void>;
}