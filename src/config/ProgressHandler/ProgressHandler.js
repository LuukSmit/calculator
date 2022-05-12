import { APIHandler, StorageHandler } from 'C4';
import { storageKeys } from 'settings';

export default class ProgressHandler {
  constructor(params) {
    this.appId = params.appId;
    this.chapter = +params.chapter;
    this.email = params.email;
    this.page = +params.page;
    this.pageCount = params.pageCount;
    this.pageType = params.pageType;
    this.progress = params.progress;
  }

  verifyChapter() {
    return this.progress.some(chapter => +chapter.chapter === +this.chapter);
  }

  verifyPage() {
    return this.page >= 0 && this.page <= this.pageCount;
  }

  update(override) {
    return new Promise((resolve, reject) => {
      const { chapter, index } = this.getChapter(this.chapter);

      const newProgress = chapter;
      if (this.page > newProgress.progress) {
        newProgress.progress = this.page;
      }
      if (this.page + 1 === this.pageCount) {
        newProgress.progress = this.pageCount;
      }
      newProgress.percentage = (newProgress.progress / newProgress.total_pages) * 100;

      if (this.page + 1 === this.pageCount) {
        newProgress.last_page = this.pageCount;
      } else if (this.page - 1 < 0) {
        newProgress.last_page = 0;
      } else {
        newProgress.last_page = this.page;
      }

      const allValid = Object.values(newProgress).every(param => param !== undefined && param !== null);
      let updateInfo = {};

      if (allValid) {
        this.progress.data[0].chapters[index] = newProgress;
        StorageHandler.save(storageKeys.progress, this.progress);

        updateInfo = {
          chapterId: +chapter.chapter,
          lastPage: +newProgress.last_page,
          progress: +newProgress.progress,
          email: this.email,
        };
        if (override !== undefined) {
          updateInfo = {
            chapterId: override.chapterId,
            lastPage: override.lastPage,
            progress: override.progress,
            email: this.email,
          };
        }
        APIHandler.setUserProgress(updateInfo).then(() => {
          resolve(this.progress);
        });
      }
      setTimeout(() => {
        const info = {
          message: 'Operation timed out',
          allValid,
          newProgress,
          updateInfo,
          progress: this.progress,
        };
        reject(new Error(info));
      }, 5000);
    });
  }

  getChapter(chapterId) {
    let obj = {};
    if (this.progress.data) {
      const { chapters } = this.progress.data[0];
      const chapterIds = chapters.map(chapter => +chapter.chapter);
      if (chapterIds.includes(+chapterId)) {
        Object.keys(chapters).forEach((index) => {
          if (+chapters[index].chapter === +chapterId) {
            obj = { chapter: chapters[index], index: +index };
          }
        });
      }
    }
    return obj;
  }

  pageIsAccessible(ignoreProgess) {
    const chapter = this.getChapter(this.chapter);
    if (chapter) {
      const { chapter: id, progress, last_page: lastPage } = chapter.chapter;

      const rootPage = `/${this.pageType}/${this.appId}/${this.email}/${id}/0`;

      if (lastPage - 1 === this.pageCount && !window.location.href.includes(rootPage) && !ignoreProgess) {
        window.location = rootPage;
      }

      if (progress < this.page && !ignoreProgess) {
        return { valid: false, target: `/${this.pageType}/${this.appId}/${this.email}/${id}/${lastPage}` };
      }
      if (progress >= this.page) {
        return { valid: true, target: '' };
      }
    }
    return { valid: true, target: '' };
  }
}
