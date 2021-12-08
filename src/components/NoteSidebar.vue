<template>
  <div id="NoteSidebar">
    <div class="noteSidebar-con">
      <div class="noteSidebar-top" v-if="curBook.title">{{curBook.title}}</div>
      <div class="noteSidebar-top" v-if="!curBook.title">请添加笔记</div>
      <div class="noteSidebar-list">
        <div class="notes" v-for="note in notes" :class="{active: curNote.id === note.id}" :key="note.id" @click="clickNote(note.id)">
          <div class="notes-box" >
            <div class="title">{{note.title}}</div>
            <div class="date">{{note.updatedAtFriendly}}</div>
            <div class="content">{{note.content}}</div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
import Bus from "@/helpers/bus";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data(){
    return{}
  },
 
  methods: {
    ...mapMutations([
        'setCurBook',
        'setCurNote'
        ]),
      ...mapActions([
        'getNotebooks',
        'getNotes',
        'addNote'
        ]),
    clickNote(noteId){
      // console.log(noteId)
      this.setCurNote({curNoteId:noteId})
      Bus.$emit('update:notes', this.curNote)
      console.log(this.curNote.id)
    }
  },
   created() {
      Bus.$on('revert',val=>{
         this.getNotebooks().then(()=>{
           console.log(this.curBook.id)
           if(this.curBook.id) return this.getNotes({ notebookId: this.curBook.id})
         })
         
      })
      this.getNotebooks()
      .then(()=>{
        console.log('2,create=>curbook.id')
        console.log(this.curBook.id)
        if(this.curBook.id) return this.getNotes({ notebookId: this.curBook.id})
      })
    },
    computed: {
      ...mapGetters([
        'notebooks',
        'notes',
        'curBook',
        'curNote'
        ])
    },
};
</script>
<style lang="less" scoped>
#NoteSidebar{
  // border: 1px solid yellowgreen;
  // min-height: 100%;
  // height: 200px;
  // width:350px;
  // min-height: 100vh;
  .noteSidebar-con{
    background-color: #fff;
    border: 1px solid #eee;
    height: 100vh;
    width: 350px;
    display: flex;
    flex-direction: column;
    .noteSidebar-top{
      padding: 20px;
      font-size: large;
      color: #999;
      border-bottom: 1px solid #eee;
      // min-height: 100%;
    }
    .noteSidebar-list{
      overflow-y:scroll;
      height: 100%;
      .notes{
        padding:0 20px;
        transition: all 150ms;
        border: 3px solid transparent;
        cursor: pointer;
        &.active {
          border: 3px solid #d9d9d9;
        }
        .notes-box{
          padding: 20px 0;
          border-bottom: 1px solid #eee ;
          height: 120px;
          color: #999;
          // border: 3px solid #d9d9d9;
          .title{
            font-family: caecilia, times, serif;
            line-height: 20px;
            font-size: 18px;
            font-weight: 400;
            color: #4a4a4a;
            overflow:hidden;
            text-overflow:ellipsis;
          }
          .content{
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
        &:hover{
          background-color: #2dbe60;
          .notes-box{
            color: #fff;
            border-bottom: 1px solid #2dbe60 ;
            .title{
              color: #fff;
            }
          }
        }
      }
    }
  }
}

</style>