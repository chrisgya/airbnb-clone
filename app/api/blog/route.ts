import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utilities/currentUser";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const body = await request.json();
  const { topic, keywords } = body;

  if (!topic || !keywords) {
    return new NextResponse("validation failed", { status: 400 });
  }

  if (topic.length > 80 || keywords.length > 80) {
    return new NextResponse("validation failed", { status: 400 });
  }

  /*const response = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 3600,
    prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
    The return format must be stringified JSON in the following format:
    {
      "postContent": post content here
      "title": title goes here
      "metaDescription": meta description goes here
    }`,
  });*/
  const systemContent = "You are a blog post generator.";
  const mainContent = `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`;
  const metaContent =
    "Generate appropriate title tag text for the above blog post";

  const postContentResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: mainContent,
      },
    ],
    temperature: 0,
  });

  const postContent = postContentResult.data.choices[0].message?.content;

  const titleResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: mainContent,
      },
      {
        role: "assistant",
        content: postContent || "",
      },
      {
        role: "user",
        content: metaContent,
      },
    ],
    temperature: 0,
  });

  const metaDescriptionResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: mainContent,
      },
      {
        role: "assistant",
        content: postContent as string,
      },
      {
        role: "user",
        content: metaContent,
      },
    ],
    temperature: 0,
  });

  const title = titleResult.data.choices[0].message?.content;
  const metaDescription =
    metaDescriptionResult.data.choices[0].message?.content;

  console.log("POST CONTENT: ", postContent);
  console.log("TITLE: ", title);
  console.log("META DESCRIPTION: ", metaDescription);

  const blogPost = await prisma.blogPost.create({
    data: {
      postContent: postContent || "",
      title: title || "",
      metaDescription: metaDescription || "",
      topic,
      keywords,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(blogPost, { status: 200 });
}
