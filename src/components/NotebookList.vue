<template>
  <div id="booklist">
    <div class="booklist-con">
      <div class="booklist-list">
        <div class="booklist-top">
          <div class="title">笔记本</div>
          <i
            class="el-icon-circle-plus-outline icon"
            @click="createBook"
            title="创建笔记本"
          ></i>
        </div>
        <div class="notebooks">
          <router-link v-for="notebook in notebooks" :key="notebook.id" to="">
            <div class="bookTitle-box">
              <div @click="choseBook(notebook.id)" class="bookTitle">
                <span class="title">{{ notebook.title }}</span>
                <span class="icons-box" @click="deleteBook(notebook.id)">
                  <i class="icon el-icon-delete"></i>
                  <i class="icon-hover el-icon-delete-solid"></i>
                </span>
              </div>
            </div>
          </router-link>
          <div class="trash-box" @click="getTrash">
            <i class="trash el-icon-delete-solid"></i>回收站
          </div>
        </div>
      </div>
      <div class="booklist-cover" @click="clickBack"></div>
    </div>
  </div>
</template>
<script>
import Bus from "@/helpers/bus";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      bookListClass: document.querySelector("#note-detail #booklist").classList,
      trashClass: document.querySelector("#trash").classList,
      noteClass: document.querySelector("#sidebar .note").classList,
    };
  },
  methods: {
    ...mapMutations(["setCurBook", "setCurNote"]),
    ...mapActions([
      "getNotebooks",
      "addNotebook",
      "updateNotebook",
      "deleteNotebook",
      "checkLogin",
      "getNotes",
      "deleteNotebook",
    ]),
    createBook() {
      this.$prompt("给笔记本起个名称", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
      }).then(({ value }) => {
        this.addNotebook({ title: value });
      });
    },
    bookappearChange() {
      this.$store.bookappear = !this.$store.bookappear;
    },
    removeBookListClass_show() {
      this.bookListClass.remove("show");
    },
    removeBookListClass_appear() {
      setTimeout(() => this.bookListClass.remove("appear"), 250);
    },
    removeSidebarIcon_show() {
      document
        .querySelectorAll("#sidebar .icons i")
        .forEach(($i) => $i.classList.remove("show"));
    },
    addSidebarNote_show() {
      noteClass.add("show");
    },
    BookListRemove(trash_show) {
      removeBookListClass_show();
      trash_show ? this.trashClass.remove("show") : null;
      removeBookListClass_appear();
    },
    choseBook(notebookId) {
      this.$store.state.noteIndex = true;
      BookListRemove("trash_show");
      bookappearChange();
      this.setCurBook({ curBookId: notebookId });
      this.getNotes({ notebookId: notebookId });
      removeSidebarIcon_show();
      addSidebarNote_show();
      console.log("book");
    },
    getTrash() {
      console.log("trash");
      this.trashClass.add("show");
      removeBookListClass_show();
      removeBookListClass_appear();
      bookappearChange();
      this.$store.state.noteIndex = false;
      Bus.$emit("test");
    },
    clickBack() {
      removeBookListClass_show();
      removeBookListClass_appear();
      bookappearChange();
      if (this.$store.state.noteIndex) {
        removeSidebarIcon_show();
        addSidebarNote_show();
      }
      console.log("back");
    },
    deleteBook(notebookId) {
      this.deleteNotebook({ notebookId: notebookId }).then(() => {
        this.getNotebooks().then(() => {
          console.log("2,create=>curbook.id");
          console.log(this.curBook.id);
          if (this.curBook.id)
            return this.getNotes({ notebookId: this.curBook.id });
          this.$router.go(0);
        });
      });
    },
  },
  created() {
    this.getNotebooks();
  },
  computed: {
    ...mapGetters(["notebooks", "notes", "curBook", "curNote"]),
    ...mapGetters(["notebooks"]),
  },
};
</script>
<style scoped lang="less">
#booklist {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
  opacity: 0;
  transition: all 400ms;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  .booklist-con {
    display: flex;
    height: 100%;

    .booklist-cover {
      flex: 1;
      opacity: 0;
    }
    .booklist-list {
      height: 100%;
      width: 456px;
      transform: translateX(-456px);
      transition: all 250ms;
      background-color: #fff;
      display: block;
      opacity: 1;
      padding-top: 20px;
      overflow-y: auto;
      .booklist-top {
        margin: 0 20px 20px 20px;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: large;
          color: #999;
        }
        .icon {
          color: #999;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .notebooks {
        border-top: 1px solid #eee;
        .bookTitle-box {
          padding: 0 10px;
          transition: all 150ms;

          .bookTitle {
            padding: 20px 10px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            // .title{
            //   color: #2dbe60;
            // }
            .icons-box {
              color: #fff;
              display: none;
              font-size: large;
              .icon-hover {
                display: none;
              }
            }
          }
          &:hover {
            background-color: #2dbe60;
            color: #fff;
            .bookTitle {
              border-bottom: 1px solid #2dbe60;
              .icons-box {
                display: block;
                &:hover {
                  .icon {
                    display: none;
                  }
                  .icon-hover {
                    display: inline;
                  }
                }
              }
            }
          }
        }
        .trash-box {
          padding: 0 10px;
          transition: all 150ms;
          cursor: pointer;
          color: #999;
          .trash {
            padding: 20px 10px;
          }
          &:hover {
            background-color: #2dbe60;
            color: #fff;
          }
        }
      }
    }
  }
  &.appear {
    display: block;
  }
  &.show {
    opacity: 1;
    .booklist-list {
      transform: translateX(0);
    }
  }
}
</style>