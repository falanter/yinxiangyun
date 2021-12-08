<template>
  <div id="trash">
    <div class="trash-con">
        <div class="noteTrashSidebar-con">
            <div class="noteSidebar-top">回收站</div>
            <div class="noteSidebar-list">
                <div class="notes" v-for="note in trashNotes" :class="{active: curTrashNote.id === note.id}" :key="note.id" @click="clickNote(note.id)">
                    <div class="notes-box">
                        <div class="title-box">
                            <div class="title">{{note.title}} </div>
                            <div class="title-btn">
                                <a class="btn" @click="onDelete(note.id)">彻底删除</a>
                                <a class="btn" @click="onRevert(note.id)">恢复</a>
                            </div>
                        </div>
                        <div class="date">{{note.updatedAtFriendly}}</div>
                        <div class="content">{{note.content}}</div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="note-detail">
            <div class="note-top">
                <i class="note-book el-icon-s-platform"></i>{{belongTo}}
            </div>
            <div class="note-title">
                <span>{{curTrashNote.title}}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Bus from "@/helpers/bus";
let md = new MarkdownIt()

export default {
  data () {
    return {}
  },

  created() {
    this.checkLogin({ path: '/' })
    this.getNotebooks()
    Bus.$on('test',val=>{
        this.getTrashNotes()
        .then(() => {
            console.log("curTrashNoteId:"+this.curTrashNote.id)
            this.setCurTrashNote({ curTrashNoteId: this.curTrashNote.id })
        })
    })
    
  },

  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
      ]),

    compiledMarkdown () {
      return md.render(this.curTrashNote.content||'')
    }
  },

  methods: {
    ...mapMutations([
      'setCurTrashNote'
      ]),

    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getNotebooks'
      ]),
    clickNote(noteid){
        console.log(noteid)
        console.log("trashnote")
        this.setCurTrashNote({ curTrashNoteId: noteid })
    },
    onDelete(noteId) {
        console.log(noteId)
      this.$confirm('删除后将无法恢复', '确定删除？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.deleteTrashNote({ noteId: noteId })
        }).then(() => {
          console.log('delete success')
          this.setCurTrashNote()  
        })
      
    },

    onRevert(noteId) {
      this.revertTrashNote({ noteId: noteId })
        .then(() => {
          this.setCurTrashNote()
        })
          Bus.$emit('revert')
    }

  },

}
</script>

<style lang="less">
#trash{
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: none;
    z-index: 2;
    background-color: #fff;
    // border: 1px solid #2dbe60;
    .trash-con{
        display: flex;
        .note-detail{
            padding: 20px;
            // border: 1px solid #CCC;
            width: 100%;
            .note-top{
                padding-bottom:10px ;
                border-bottom: 1px solid #eee;
                .note-book{
                    color: #ccc;
                    margin-right: 10px;
                }
            }
            .note-title{
                display: inline-block;
                width: 100%;
                border: none;
                outline: none;
                font-size: 40px;
                color: #2dbe60;
                padding: 10px 20px;
            }
            .editor,.preview{
                // border: 1px solid #000;
                margin-left: 20px;
                height: ~"calc(70% - 70px)";
            }
        }
        .noteTrashSidebar-con{
            background-color: #fff;
            border: 1px solid #eee;
            width: 350px;
            height: 100vh;
            display: flex;
            flex-direction: column;
        .noteSidebar-top{
            padding: 20px;
            font-size: large;
            color: #999;
            border-bottom: 1px solid #eee;
        }
        .noteSidebar-list{
            overflow: auto;
            .notes{
                padding:0 20px;
                transition: all 150ms;
                cursor: pointer;
                border: 3px solid transparent;
                &.active{
                    border: 3px solid #d9d9d9;
                }
                .notes-box{
                    padding: 20px 0;
                    border-bottom: 1px solid #eee ;
                    height: 120px;
                    color: #999;
                    // border: 3px solid #d9d9d9;
                    .content{
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                    .title-box{
                        display: flex;
                        justify-content: space-between;
                        
                        .title{
                            // width: 150px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            font-family: caecilia, times, serif;
                            line-height: 20px;
                            font-size: 18px;
                            font-weight: 400;
                            color: #4a4a4a;
                        }
                        .title-btn{
                            width: 100px;
                            white-space:nowrap;
                            margin-right:10px ;
                            // display: none;
                            .btn{
                                border: 1px solid #fff;
                                border-radius: 4px;
                                padding: 2px 5px;
                                margin-right: 10px;
                                font-size: small;
                                color: #fff;
                                &:hover{
                                    background-color: #fff;
                                    color:#2dbe60;
                                }
                            }
                        }
                        
                    }
                }
                &:hover{
                    background-color: #2dbe60;
                    color: #fff;
                    .notes-box{
                        border-bottom: 1px solid #2dbe60 ;
                        color: #fff;
                        .title{
                            transition: all 150ms;
                            color: #fff;
                        }
                        .title-box{
                            .title-btn{
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
  }
  &.show{
      display: block;
  }
}
</style>