// module.exports = file => require('@/views/transfer' + file + '.vue').default // vue-loader at least v13.0.0+
//                                import('@/views/article/addArticle')
// module.exports = file => () => import('@/views/article' + file)

module.exports = file => ()=>{
  console.log("import development"+file)
  return map[file] || null
}

const map = {
  Icon : () => import('@/views/icon/index'),
  Erji :() => import('@/views/duoji/erji'),
  Erji2 : () => import('@/views/duoji/erji2'),
   Sanji : () => import('@/views/duoji/sanji'),
   Sanji2 : () => import('@/views/duoji/sanji2'),
   Siji : () => import('@/views/duoji/siji'),
   Wuji : () => import('@/views/duoji/wuji'),
   Transfer : () => import('@/views/transfer/transfer'),
   DataTable : () => import('@/views/table/dataTables'),
   FilterTable : () => import('@/views/table/filterTable'),
   DragTable : () => import('@/views/table/dragTabe'),
   Upload : () => import('@/views/upload/upload'),
   Markdown : () => import('@/views/editor/markdownView'),
   WangeditorView : () => import('@/views/editor/wangeditorView'),
   NotFound : () => import('@/page404'),
   AddArticle : () => import('@/views/article/addArticle'),
   AddArticleEditor : () => import('@/views/article/addArticleEditor'),
   NavClassify : () => import('@/views/syssetting/navClassify'),
   pagePermissions : () => import('@/views/permissions/pagePermissions'),
   btnPermissions : () => import('@/views/permissions/btnPermissions')
}
