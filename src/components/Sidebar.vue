<template>
  <div id="sidebar">
        <div class="sidebar-con">
            <div class="login">
                <avatar class="avatar"></avatar>
                <div class="icons">
                    <div class="addNote"><i class="el-icon-plus" @click="onaddNote"></i></div>
                    <router-link to="/note" title="笔记" ><i class="note el-icon-s-order show" @click="note"></i></router-link>
                    <router-link to="/note" title="文件夹"><i class="book el-icon-s-platform" @click="book"></i></router-link>
                    <!-- <router-link to="/trash" title="回收站"><i class="trash el-icon-delete-solid" @click="trash"></i></router-link> -->
                </div>
            </div>
            <div class="logout" @click="onLogout">
                <i class="el-icon-switch-button"></i>
            </div>
        </div>
  </div>
</template>
<script>
    import Auth from '@/apis/auth'
    import avatar from '@/components/Avatar'
    import Bus from '@/helpers/bus'
    import {mapState,mapActions, mapMutations,mapGetters} from 'vuex'
    export default {
        components:{
            avatar
        },
        inject:['reload'],
        methods:{
            ...mapActions([
                'addNote',
                "addNotebook",
                "deleteNotebook"
        ]),
        ...mapMutations([
            'setCurNote',
            'setCurBook'
        ]),
        onLogout(){    
            Auth.logout()
            .then(
                res=>{
                    console.log(res)
                    Bus.$emit('out',res)
                    this.$store.login=false
                    this.$router.push({path:'/'})
                    this.reload()
                }
            )
        },
        deleteBook(){
            console.log(this.curBook.id)
            // console.log('3282')
            this.deleteNotebook({notebookId:this.curBook.id})
        },
        onaddNote(){
            this.$store.state.noteIndex=true
            document.querySelector("#trash").classList.remove("show");
            console.log(this.curBook.id)
            if(this.curBook.id==null){
                this.addNotebook({ title: "我的第一个笔记本" }).then(()=>{
                    this.addNote({ notebookId: this.curBook.id }).then(noteid=>{
                        this.setCurNote({curNoteId:noteid})
                    })
                    this.$router.push({path:'/empty'})
                })
                    
            }else{
                this.addNote({ notebookId: this.curBook.id }).then(noteid=>{
                    this.setCurNote({curNoteId:noteid})
                })
            }
        },
        note(){
            this.$store.state.noteIndex=true
            document.querySelector("#trash").classList.remove("show");
            document.querySelectorAll('#sidebar .icons i').forEach($i=>$i.classList.remove('show'))
            document.querySelector('#sidebar .note').classList.add('show')
            if(this.$store.bookappear){
                document.querySelector('#note-detail #booklist').classList.remove('show')
                setTimeout(()=>document.querySelector('#note-detail #booklist').classList.remove('appear'),250)
                this.$store.bookappear=!this.$store.bookappear
            }
        },
        book(){
            // console.log(document.querySelector('#note-detail #booklist'))
            // console.log(this.$store.bookappear)
            document.querySelectorAll('#sidebar .icons i').forEach($i=>$i.classList.remove('show'))
            if(document.querySelector('#note-detail #booklist')){
                if(!this.$store.bookappear){
                    document.querySelector('#note-detail #booklist').classList.add('appear')
                    setTimeout(()=>document.querySelector('#note-detail #booklist').classList.add('show'))
                    this.$store.bookappear=!this.$store.bookappear
                    document.querySelector('#sidebar .book').classList.add('show')
                }
                else{
                    document.querySelector('#note-detail #booklist').classList.remove('show')
                    setTimeout(()=>document.querySelector('#note-detail #booklist').classList.remove('appear'),250)
                    this.$store.bookappear=!this.$store.bookappear
                    document.querySelector('#sidebar .note').classList.add('show')
                }  
            }
        },
        // trash(){
        //     document.querySelectorAll('#sidebar .icons i').forEach($i=>$i.classList.remove('show'))
        //     document.querySelector('#sidebar .trash').classList.add('show')
        // }
        },
        computed: {
        ...mapGetters([
            'curBook',
            'curNote'
            ])
    },
    }
</script>
<style scoped lang="less">

#sidebar {
    width: 73px;
    background-color: #f8f8f8;
    z-index: 99;
    .sidebar-con{
        background-color: #f8f8f8;
        border-right: 1px solid #ececec;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .login{
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .icons{
                margin-top:10px;
                
                // display: flex;
                // flex-direction: column;
                
                .book,.note,.trash,.addNote{
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    // padding: 6px 0;
                    margin: 15px;
                    color:#2dbe60;
                    border: 1px solid #f8f8f8;
                    transition: all 250ms;
                    &:hover{
                        border: 1px solid #2dbe60;
                        background-color: #2dbe60;
                        color: #fff;
                    }
                }
                .addNote{
                    background-color: #fff;
                    border:1px solid #ccc;
                    margin-bottom: 40px;
                }
            }
            .icons .show {
                // color:#fff;
                border: 1px solid #2dbe60;
                background-color: #fff;
            }
        }
        .logout{
            cursor: pointer;
            margin: 15px auto;
            font-size: 20px;
            width: 35px;
            height: 35px;
            color: #2dbe60;
            // background: yellow;
            display: flex;
            i{
                margin: auto;
            }
        }
        
    }
}
</style>