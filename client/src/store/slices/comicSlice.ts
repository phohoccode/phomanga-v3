import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategorys,
  fetchComicDetail,
  fetchComicInfo,
  fetchComicSlide,
  fetchCompletedComic,
  fetchNewComic,
  fetchPublishedComic,
  fetchSearchComic,
  fetchUpComingComic,
} from "../asyncThunk/comic";
import { comicCategory } from "@/lib/types";

export interface ComicState {
  catetorys: comicCategory[];
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
  };
  searchComic: {
    items: any[];
    breadCrumb: any[];
    params: any;
    titlePage: string;
  };
  comicInfo: any;
  isLoading: boolean;
}

const initialState: ComicState = {
  catetorys: [],
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
  },
  comicInfo: {},
  searchComic: {
    items: [],
    breadCrumb: [],
    params: {},
    titlePage: "",
  },
  isLoading: false,
};

export const comicSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Dữ liệu thể loại truyện
      .addCase(fetchCategorys.pending, (state) => {})
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.catetorys = action.payload.data?.items;
      })
      .addCase(fetchCategorys.rejected, (state) => {})

      // Dữ liệu slide truyện
      .addCase(fetchComicSlide.pending, (state) => {
        state.conmicSlide.loading = true;
      })
      .addCase(fetchComicSlide.fulfilled, (state, action) => {
        state.conmicSlide.loading = false;
        state.conmicSlide.items = action.payload.data?.items;
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
        state.newComic.items = action.payload.data?.items;
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
        state.publishedComic.items = action.payload.data?.items;
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
        state.upComingComic.items = action.payload.data?.items;
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
        state.completedComic.items = action.payload.data?.items;
      })
      .addCase(fetchCompletedComic.rejected, (state) => {
        state.completedComic.loading = false;
      })

      // Dữ liệu chi tiết truyện
      .addCase(fetchComicDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComicDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comicDetail.items = action.payload?.data?.items;
        state.comicDetail.breadCrumb = action.payload?.data?.breadCrumb;
        state.comicDetail.params = action.payload?.data?.params;
        state.comicDetail.titlePage = action.payload?.data?.titlePage;
      })
      .addCase(fetchComicDetail.rejected, (state) => {
        state.isLoading = false;
      })

      // Dữ liệu thông tin truyện
      .addCase(fetchComicInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComicInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comicInfo = action.payload?.data;
      })
      .addCase(fetchComicInfo.rejected, (state) => {
        state.isLoading = false;
      })

      // Dữ liệu tìm kiếm truyện
      .addCase(fetchSearchComic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchComic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchComic.items = action.payload?.data?.items;
        state.searchComic.breadCrumb = action.payload?.data?.breadCrumb;
        state.searchComic.params = action.payload?.data?.params;
        state.searchComic.titlePage = action.payload?.data?.titlePage;
      })
      .addCase(fetchSearchComic.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = comicSlice.actions;

export default comicSlice.reducer;
