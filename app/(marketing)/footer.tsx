import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/il.svg"
            alt="עברית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          עברית
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/hr.svg"
            alt="קרואטית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          קרואטית
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/es.svg"
            alt="ספרדית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          ספרדית
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/fr.svg"
            alt="צרפתית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          צרפתית
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/it.svg"
            alt="איטלקית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          איטלקית
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/jp.svg"
            alt="יפנית"
            height={32}
            width={40}
            className="me-4 rounded-md"
          />
          יפנית
        </Button>
      </div>
    </div>
  );
};
