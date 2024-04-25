"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Title from "@/components/ui/title";
import { Thread } from "@/type";
import ThreadCard from "@/components/shared/thread-card";

const PopularThreads = ({ data }: { data: Thread[] }) => {
  return (
    <section className="flex flex-col">
      <Title>Popular Threads</Title>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {data &&
            data.map((thread) => (
              <CarouselItem
                key={thread.slug}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <ThreadCard thread={thread} />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default PopularThreads;
