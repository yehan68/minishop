import request from '@/utils/request'

export const getSwiper = () => // 获取首页轮播图
  request({
    url: '/home/swiper',
    method: 'get'
  })

export const getCategory = () => // 获取全部分类
  request({
    url: '/category/all',
    method: 'get'
  })

export const getCategoryTopTen = () => // 获取一级分类前十
  request({
    url: '/category/topTen',
    method: 'get'
  })

export const getProductList = (params: any) => // 获取商品列表
  request({
    url: '/product/list',
    method: 'get',
    params
  })

export const getProductDetail = (params: any) => // 获取商品详情
  request({
    url: '/product/detail',
    method: 'get',
    params
  })
