<template>
  <div class="h-screen w-full">
    <NavBar />
    <div class="bg-blue-50 w-1/6 mt-20 float-left timeline"></div>
    <div class="w-4/6 h-full float-left overflow-y-scroll pt-10 pb-2 mt-16 timeline">
      <div class="pr-3 rounded-lg">
        <div class="w-full h-16 rounded-lg">
          <div
            :class="
              newPost
                ? 'w-2/4 h-96 absolute ml-40 rounded-lg'
                : 'w-4/6 bg-blue-400 mx-auto h-1 rounded-lg'
            "
          >
            <div
              v-show="newPost"
              class="bg-white shadow-2xl border border-blue-400 rounded-lg py-3"
            >
              <div class="heading text-center font-bold text-base m-2 text-gray-800">
                New Post
              </div>
              <div
                class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
              >
                <input
                  v-model="postAdded.title"
                  class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                  spellcheck="false"
                  placeholder="Title"
                  type="text"
                />
                <textarea
                  v-model="postAdded.content"
                  class="description bg-gray-100 sec text-sm p-3 h-60 border border-gray-300 outline-none"
                  spellcheck="false"
                  placeholder="Describe everything about this post here"
                ></textarea>
                <div class="flex w-full" v-show="photoAdded">
                  <img
                    class="w-4/6 h-20"
                    v-bind:src="
                      require('./../static/image_post/' + photoChoosed + '.svg')
                    "
                    alt=""
                  />
                </div>
                <div class="icons flex text-gray-500 m-2">
                  <svg
                    class="mr-2 cursor-pointer hover:text-blue-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <div
                    class="w-40 bg-blue-50 overflow-x-scroll h-10 overflow-y-hidden py-1"
                  >
                    <div v-for="i in images">
                      <img
                        @click="addPhoto(i.id)"
                        v-bind:src="require('./../static/image_post/' + i.id + '.svg')"
                        class="cursor-pointer w-8 h-8 border py-1 border-gray-400 float-left mr-1 hover:bg-blue-400"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="count ml-auto text-gray-400 text-xs font-semibold">
                    0/300
                  </div>
                </div>
                <div class="buttons flex">
                  <div
                    @click="newPostFunc()"
                    class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                  >
                    Cancel
                  </div>
                  <div
                    @click="addPost()"
                    class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                  >
                    Post
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            @click="newPostFunc()"
            class="float-right rounded-full bg-blue-400 p-2 border border-gray-50 cursor-pointer"
          >
            <svg
              v-show="!newPost"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <svg
              v-show="newPost"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        v-for="post in computedPosts"
        id="post"
        class="bg-blue-50 mt-4 w-3/6 m-auto rounded-lg"
      >
        <div class="w-full bg-blue-200">
          <div class="float-right pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 bg-yellow-200 rounded-full float-left p-1 cursor-pointer ml-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 bg-red-200 rounded-full float-left p-1 cursor-pointer ml-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <svg
              @click="expand()"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 bg-blue-200 rounded-full float-left p-1 cursor-pointer ml-1 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
        </div>
        <div class="text-base ml-2 mt-6">
          <div class="float-left rounded-full text-sm mr-2 w-8 h-8 bg-red-500">a</div>
          @ username
        </div>
        <div class="w-full h-4"></div>
        <div class="w-full mt-4 text-sm font-medium py-1 px-6">{{ post.content }}</div>
        <div class="mt-2">
          <p class="text-right text-xs text-gray-400 font-normal px-2">
            {{ post.date }}
          </p>
          <img
            class="w-5/6 mx-2"
            v-bind:src="require('./../static/image_post/' + post.imageUrl + '.svg')"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="bg-blue-50 w-1/6 h-full float-left"></div>
  </div>
</template>

<script lang="ts">
import { images } from "./../data/image_posts/image_post";
import WritePost from "~/components/WritePost.vue";
import { Post } from "~/data/models/post.model";
import NavBar from "~/components/NavBar.vue";
import { posts } from "~/data/posts/posts";
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",
  components: { NavBar, WritePost },
  data() {
    return {
      images: images,
      expanded: false,
      photoAdded: false,
      newPost: false,
      photoChoosed: "1",
      postAdded: {
        postId: 1,
        title: "",
        content: "",
        imageUrl: "",
        date: new Date().toLocaleString(),
      },
      posts: posts as Post[],
    };
  },
  computed: {
    computedPosts(): Post[] {
      return this.posts.reverse();
    },
  },
  methods: {
    addPhoto(id: string) {
      this.photoChoosed = id;
      this.photoAdded = true;
    },
    addPost() {
      this.postAdded.imageUrl = this.photoChoosed;
      this.posts.push(this.postAdded);
      this.newPost = false;
    },
    newPostFunc() {
      this.newPost = !this.newPost;
    },
    expand() {
      this.expanded = !this.expanded;
      const post = document.getElementById("post");

      this.expanded
        ? this.postExpanded(true)
        : post?.style?.setProperty("position", "relative");
    },
    postExpanded(neg: boolean) {
      const post = document.getElementById("post");
      if (neg) {
        post?.style?.setProperty("position", "absolute");
        post?.style?.setProperty("width", "700");
      } else {
        post?.style?.setProperty("width", "13%");
        post?.style?.setProperty("position", "relative");
      }
    },
  },
});
</script>
<style>
@font-face {
  font-family: JetBrains;
  src: url("./../static/fonts/JetBrainsMono-Regular.ttf");
}

* {
  font-family: JetBrains;
}
.timeline {
  height: 90%;
}
@media (max-width: 480px) {
  #menu {
    background-color: red;
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(91, 175, 216);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d3d3d3;
}
</style>
