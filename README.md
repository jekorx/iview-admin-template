# iview-admin-template

> [iview-admin](https://github.com/iview/iview-admin)  

## Features

- Login / Logout
- Permission Authentication
    - A list of filters
    - Permission to switch
- i18n
- Components
    - Rich Text Editor
    - Markdown Editor
    - City Cascader
    - Photos preview and edit
    - Draggable list
    - File upload
    - Digital gradient
    - split-pane
- Form
    - The article published
    - Workflow
- Table
    - Drag-and-drop sort
    - Searchable form
    - Table export data
        - Export to Csv file
        - Export to Xls file
    - Table to picture
- Error Page
    - 403
    - 404
    - 500
- Router
    - Dynamic routing
    - With reference page
- Theme
- Shrink the sidebar
- Tag navigation
- Breadcrumb navigation
- Full screen / exit full screen
- Lock screen
- The message center
- Personal center

## Getting started
```bush
// install dependencies
yarn

// develop
yarn dev
```

## Build
```bush
yarn build
```

## menu data structure

```java
// id
private String id;
// 标题
private String title;
// 请求url
private String url;
// url标识，一般为url简写
private String code;
// 图标
private String icon;
// 父级菜单
private String parentId;
// 父级菜单名称
private String parentName;
// 创建时间
private Date createTime;
// 创建用户id
private String createUser;
// 创建时间
private Date updateTime;
// 修改用户id
private String updateUser;
// 顺序
private Integer sort;
// 是否有子节点
private boolean hasChildren;
// 是否选中
private boolean checked;
// 子节点
private List<ResourceBean> children;
```
