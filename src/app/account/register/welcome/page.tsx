export default function Welcome() {
  return (
    <main className="mx-auto flex max-w-prose flex-col gap-4 py-10">
      <h1 className="text-2xl font-bold">
        Welcome to your Live Davenings account!
      </h1>
      <p>
        Now that you have an account, you can make contributions to the site.
        Please note that{" "}
        <strong>
          no contributions you make will be public until they have been manually
          reviewed
        </strong>
        . This is to prevent spam and rudeness on the website, as well as to
        ensure every contribution is meaningful. Once a few of your
        contributions have been accepted, you will be able to bypass this
        process.
      </p>
      <p>There are three ways to contribute to Live Davenings:</p>
      <ol className="ml-5 flex list-decimal flex-col gap-4">
        <li>
          <h2 className="text-lg font-bold">Posting comments</h2>
          <p>
            You can post comments in the comment box under any content page on
            the site. Posting comments allows you to share any of your
            experiences, thoughts, or other information relevant to a page.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-bold">Editing metadata</h2>
          <p>
            Every page contains metadata such as dates, descriptions, locations,
            names of cantors, images, etc. If you have additional information
            about a recording or other site entry that the original submitter
            didn’t have, you may click the “improve metadata” button on any page
            to make improvements.
          </p>
        </li>
      </ol>
    </main>
  );
}
