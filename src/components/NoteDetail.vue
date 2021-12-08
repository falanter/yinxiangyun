<template>
    <div id="note-detail">
        <div id="notesidebar">
            <NoteSidebar @update:notes="val => notes = val"></NoteSidebar>
            <NotebookList></NotebookList>
            <Trash></Trash>
            <div class="note-edit">
                <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
                <div class="note-have" v-show="curNote.id">
                    <div class="note-detail-ct">
                        <span class="Button el-icon-delete-solid" @click="deleteNote" title="删除"></span>
                        <span> {{statusText}}</span>
                        <span class="Button el-icon-aim" @click="isShowPreview=!isShowPreview" title="预览"></span>
                    </div>
                    <div class="note-title">
                        <input type="text" v-model:value="curNote.title" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">
                    </div>
                    <div class="editor">
                        <textarea v-show="!isShowPreview" v-model:value="curNote.content" @keydown="statusText='正在输入...'" @input="updateNote" placeholder="输入内容, 支持 markdown 语法"></textarea>
                        <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Notes from '@/apis/notes'
import NoteSidebar from '@/components/NoteSidebar'
import NotebookList from '@/components/NotebookList'
import Trash from '@/components/TrashDetail'
import {mapState,mapActions, mapMutations,mapGetters} from 'vuex'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
let md=new MarkdownIt()

export default {
    components:{
        NoteSidebar,
        NotebookList,
        Trash
    },
    data () {
        return {
            statusText: '笔记未改动',
            isShowPreview: false
        }
    },
    computed: {
        ...mapGetters([
            'notebooks',
            'notes',
            'curBook',
            'curNote'
        ]),
        previewContent() {
            console.log(this.curNote.content||'')
            return md.render(this.curNote.content||'')
        }
    },
    methods:{
        ...mapActions([
            'getNotebooks',
            'getNotes',
            'addNote'
        ]),
        updateNote:_.debounce(function(){
            Notes.updateNote({noteId:this.curNote.id},{title:this.curNote.title,content:this.curNote.content})
            .then(data=>{
                this.statusText='已保存'
            }).catch(data=>{
                this.statusText='保存出错'
            })
        },300),
        deleteNote() {
            Notes.deleteNote({ noteId: this.curNote.id })
            .then(data => {
                this.$message.success(data.msg)
                this.notes.splice(this.notes.indexOf(this.curNote), 1)
                // this.$router.replace({ path: '/note' })
            })
        }
    },

}
</script>
<style lang="less" scoped>
#note-detail{
    position: relative;
    flex: 1;
    background-color: #fff;
    // border: 2px solid #000;
    #notesidebar{
        display:flex;
        .note-edit{
            flex: 1;
            .note-empty{
                // border: 1px solid #000;
                background-color: #fefefe;
                min-height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: large;
                color: #999;
            }
            .note-have{
                height: ~"calc(100% - 70px)";
                // border: 1px solid rgba(0, 0, 0, 3);
                .note-detail-ct{
                    font-size:medium;
                    display: flex;
                    justify-content: space-between;
                    margin: 20px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 20px;
                    .Button{
                        cursor: pointer;
                        margin: 0 20px;
                        font-size: large;
                    }
                }
                .note-title{
                    input{
                        display: inline-block;
                        width: 100%;
                        border: none;
                        outline: none;
                        font-size: 40px;
                        color: #2dbe60;
                        padding: 10px 20px;
                    }
                }
                .editor,.preview{
                    margin-left: 20px;
                    height: ~"calc(70% - 25px)";
                    textarea {
                        width: 100%;
                        height: 100%;
                        border: none;
                        resize: none;
                        outline: none;
                        font-size: 14px;
                        font-family: 'Monaco', courier, monospace;
                    }
                }
            }
        }
    }
    
}

</style>