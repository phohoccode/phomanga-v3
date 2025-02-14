import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategorys,
  fetchComicDetail,
  fetchComicInfo,
  fetchComicSlide,
  fetchCompletedComic,
  fetchImageComic,
  fetchNewComic,
  fetchPublishedComic,
  fetchSearchComic,
  fetchSearchComicPreview,
  fetchUpComingComic,
} from "../asyncThunk/comicAsyncThunk";
import { comicCategory } from "@/lib/types";

export interface ComicState {
  catetorys: {
    items: comicCategory[];
    loading: boolean;
  };
  conmicSlide: {
    items: any[];
    loading: boolean;
  };
  newComic: {
    items: any[];
    loading: boolean;
  };
  publishedComic: {
    items: any[];
    loading: boolean;
  };
  upComingComic: {
    items: any[];
    loading: boolean;
  };
  completedComic: {
    items: any[];
    loading: boolean;
  };
  comicDetail: {
    items: any[];
    breadCrumb: any[];
    params: any;
    titlePage: string;
    loading: boolean;
  };
  searchComic: {
    items: any[];
    breadCrumb: any[];
    params: any;
    titlePage: string;
    loading: boolean;
  };
  searchComicPreview: {
    items: any[];
    totalItems: number;
    loading: boolean;
  };
  comicInfo: {
    items: any;
    breadCrumb: any[];
    seoOnPage: any;
    loading: boolean;
  };
  imagesComic: {
    item: any;
    loading: boolean;
  };
}

const initialState: ComicState = {
  catetorys: {
    items: [],
    loading: true,
  },
  conmicSlide: {
    items: [],
    loading: true,
  },
  newComic: {
    items: [],
    loading: true,
  },
  publishedComic: {
    items: [],
    loading: true,
  },
  upComingComic: {
    items: [],
    loading: true,
  },
  completedComic: {
    items: [],
    loading: true,
  },
  comicDetail: {
    items: [],
    breadCrumb: [],
    params: {},
    titlePage: "",
    loading: false,
  },
  comicInfo: {
    items: {},
    breadCrumb: [],
    seoOnPage: {},
    loading: false,
  },
  searchComic: {
    items: [],
    breadCrumb: [],
    params: {},
    titlePage: "",
    loading: false,
  },
  searchComicPreview: {
    items: [],
    totalItems: 0,
    loading: true,
  },
  imagesComic: {
    item: {},
    loading: true,
  },
};

export const comicSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Dữ liệu thể loại truyện
      .addCase(fetchCategorys.pending, (state) => {
        state.catetorys.loading = true;
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.catetorys.items = action.payload.data?.items ?? [];
        state.catetorys.loading = false;
      })
      .addCase(fetchCategorys.rejected, (state) => {
        state.catetorys.loading = false;
      })

      // Dữ liệu slide truyện
      .addCase(fetchComicSlide.pending, (state) => {
        state.conmicSlide.loading = true;
      })
      .addCase(fetchComicSlide.fulfilled, (state, action) => {
        state.conmicSlide.loading = false;
        state.conmicSlide.items = action.payload.data?.items ?? [];
      })
      .addCase(fetchComicSlide.rejected, (state) => {
        state.conmicSlide.loading = false;
      })

      // Dữ liệu truyện mới
      .addCase(fetchNewComic.pending, (state) => {
        state.newComic.loading = true;
      })
      .addCase(fetchNewComic.fulfilled, (state, action) => {
        state.newComic.loading = false;
        state.newComic.items = action.payload.data?.items ?? [];
      })
      .addCase(fetchNewComic.rejected, (state) => {
        state.newComic.loading = false;
      })

      // Dữ liệu truyện đang phát hành
      .addCase(fetchPublishedComic.pending, (state) => {
        state.publishedComic.loading = true;
      })
      .addCase(fetchPublishedComic.fulfilled, (state, action) => {
        state.publishedComic.loading = false;
        state.publishedComic.items = action.payload.data?.items ?? [];
      })
      .addCase(fetchPublishedComic.rejected, (state) => {
        state.publishedComic.loading = false;
      })

      // Dữ liệu truyện sắp ra mắt
      .addCase(fetchUpComingComic.pending, (state) => {
        state.upComingComic.loading = true;
      })
      .addCase(fetchUpComingComic.fulfilled, (state, action) => {
        state.upComingComic.loading = false;
        state.upComingComic.items = action.payload.data?.items ?? [];
      })
      .addCase(fetchUpComingComic.rejected, (state) => {
        state.upComingComic.loading = false;
      })

      // Dữ liệu truyện đã hoàn thành
      .addCase(fetchCompletedComic.pending, (state) => {
        state.completedComic.loading = true;
      })
      .addCase(fetchCompletedComic.fulfilled, (state, action) => {
        state.completedComic.loading = false;
        state.completedComic.items = action.payload.data?.items ?? [];
      })
      .addCase(fetchCompletedComic.rejected, (state) => {
        state.completedComic.loading = false;
      })

      // Dữ liệu chi tiết truyện
      .addCase(fetchComicDetail.pending, (state) => {
        state.comicDetail.loading = true;
      })
      .addCase(fetchComicDetail.fulfilled, (state, action) => {
        state.comicDetail.loading = false;
        state.comicDetail.items = action.payload?.data?.items ?? [];
        state.comicDetail.breadCrumb = action.payload?.data?.breadCrumb;
        state.comicDetail.params = action.payload?.data?.params;
        state.comicDetail.titlePage = action.payload?.data?.titlePage;
      })
      .addCase(fetchComicDetail.rejected, (state) => {
        state.comicDetail.loading = false;
      })

      // Dữ liệu thông tin truyện
      .addCase(fetchComicInfo.pending, (state) => {
        state.comicInfo.loading = true;
      })
      .addCase(fetchComicInfo.fulfilled, (state, action) => {
        state.comicInfo.loading = false;
        state.comicInfo.items = action.payload?.data?.item;
        state.comicInfo.seoOnPage = action.payload?.data?.seoOnPage;
        state.comicInfo.breadCrumb = action.payload?.data?.breadCrumb;
      })
      .addCase(fetchComicInfo.rejected, (state) => {
        state.comicInfo.loading = false;
      })

      // Dữ liệu tìm kiếm truyện
      .addCase(fetchSearchComic.pending, (state) => {
        state.searchComic.loading = true;
      })
      .addCase(fetchSearchComic.fulfilled, (state, action) => {
        state.searchComic.loading = false;
        state.searchComic.items = action.payload?.data?.items ?? [];
        state.searchComic.breadCrumb = action.payload?.data?.breadCrumb;
        state.searchComic.params = action.payload?.data?.params;
        state.searchComic.titlePage = action.payload?.data?.titlePage;
      })
      .addCase(fetchSearchComic.rejected, (state) => {
        state.searchComic.loading = false;
      })

      // Dữ liệu tìm kiếm truyện preview
      .addCase(fetchSearchComicPreview.pending, (state) => {
        state.searchComicPreview.items = [];
        state.searchComicPreview.loading = true;
      })
      .addCase(fetchSearchComicPreview.fulfilled, (state, action) => {
        state.searchComicPreview.loading = false;
        state.searchComicPreview.totalItems =
          action.payload?.data?.params?.pagination?.totalItems ?? 0;
        state.searchComicPreview.items = action.payload?.data?.items ?? [];
      })
      .addCase(fetchSearchComicPreview.rejected, (state) => {
        state.searchComicPreview.loading = false;
      })

      // Dữ liệu ảnh truyện
      .addCase(fetchImageComic.pending, (state) => {
        state.imagesComic.loading = true;
      })
      .addCase(fetchImageComic.fulfilled, (state, action) => {
        state.imagesComic.loading = false;
        state.imagesComic.item = action.payload.data?.item;
      })
      .addCase(fetchImageComic.rejected, (state) => {
        state.imagesComic.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = comicSlice.actions;

export default comicSlice.reducer;
