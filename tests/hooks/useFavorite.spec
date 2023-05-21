// import { renderHook, act } from "@testing-library/react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { TUser } from "@/types";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import useFavorite from "@/app/hooks/useFavorite";

// jest.mock("next/navigation");
// jest.mock("react-hot-toast");

// describe("useFavorite", () => {
//   const server = setupServer();

//   const router = {
//     refresh: jest.fn(),
//   };

//   const loginModal = {
//     onOpen: jest.fn(),
//   };

//   const mockEvent = {
//     stopPropagation: jest.fn(),
//   } as unknown as React.MouseEvent<HTMLDivElement>;

//   const currentUser: TUser = {
//     id: "user-1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     emailVerified: new Date(),
//     image: "user-image.jpg",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     favoriteIds: ["listing-1", "listing-2"],
//   };

//   beforeAll(() => {
//     server.listen();
//   });

//   // beforeEach(() => {
//   //   jest.mock("../app/hooks/useLoginModal", () => ({
//   //     __esModule: true,
//   //     default: jest.fn().mockReturnValue(loginModal),
//   //   }));

//   //   (useRouter as jest.Mock).mockReturnValue(router);
//   // });

//   let originalFetch: typeof window.fetch;
//   beforeEach(() => {
//     originalFetch = window.fetch;
//     const mockFetch = jest.fn();

//     mockFetch.mockImplementation((url: RequestInfo, options?: RequestInit) => {
//       if (typeof url === "string" && url === "/api/favorites/listing-1") {
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({}),
//         }) as Promise<Response>;
//       } else if (
//         typeof url === "string" &&
//         url === "/api/favorites/listing-2"
//       ) {
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({}),
//         }) as Promise<Response>;
//       } else {
//         return Promise.resolve({
//           ok: false,
//           json: () => Promise.resolve({}),
//         }) as Promise<Response>;
//       }
//     });

//     (window as any).fetch = mockFetch;

//     jest.mock("../app/hooks/useLoginModal", () => ({
//       __esModule: true,
//       default: jest.fn().mockReturnValue(loginModal),
//     }));

//     (useRouter as jest.Mock).mockReturnValue(router);
//   });

//   afterEach(() => {
//     (window as any).fetch = originalFetch;
//     jest.restoreAllMocks();
//   });

//   // afterEach(() => {
//   //   jest.restoreAllMocks();
//   //   // jest.clearAllMocks();
//   //   server.resetHandlers();
//   // });

//   afterAll(() => {
//     server.close();
//   });

//   test("should initialize correctly", () => {
//     const { result } = renderHook(() =>
//       useFavorite({ listingId: "listing-1", currentUser })
//     );

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.hasFavorited).toBe(true);
//   });

//   test("should toggle favorite successfully", async () => {
//     const { result } = renderHook(() =>
//       useFavorite({ listingId: "listing-1", currentUser })
//     );

//     server.use(
//       rest.put("/api/favorites/listing-1", (req, res, ctx) => {
//         return res(ctx.status(200));
//       }),
//       rest.delete("/api/favorites/listing-1", (req, res, ctx) => {
//         return res(ctx.status(200));
//       })
//     );

//     await act(async () => {
//       await result.current.toggleFavorite(mockEvent);
//     });

//     expect(router.refresh).toHaveBeenCalled();
//     expect(toast.success).toHaveBeenCalledWith("Success");
//     expect(result.current.isLoading).toBe(false);

//     await act(async () => {
//       await result.current.toggleFavorite(mockEvent);
//     });

//     expect(router.refresh).toHaveBeenCalledTimes(2);
//     expect(toast.success).toHaveBeenCalledTimes(2);
//     expect(result.current.isLoading).toBe(false);
//   });

//   test("should open login modal when user is not logged in", async () => {
//     const { result } = renderHook(() =>
//       useFavorite({ listingId: "listing-1", currentUser: null })
//     );

//     await act(async () => {
//       await result.current.toggleFavorite(mockEvent);
//     });

//     expect(loginModal.onOpen).toHaveBeenCalled();
//     expect(router.refresh).not.toHaveBeenCalled();
//     expect(toast.success).not.toHaveBeenCalled();
//     expect(result.current.isLoading).toBe(false);
//   });

//   test("should handle error when adding/removing favorite", async () => {
//     server.use(
//       rest.put("/api/favorites/listing-1", (req, res, ctx) => {
//         return res(ctx.status(500));
//       }),
//       rest.delete("/api/favorites/listing-1", (req, res, ctx) => {
//         return res(ctx.status(500));
//       })
//     );

//     const { result } = renderHook(() =>
//       useFavorite({ listingId: "listing-1", currentUser })
//     );

//     await act(async () => {
//       await result.current.toggleFavorite(mockEvent);
//     });

//     expect(toast.error).toHaveBeenCalledWith("Something went wrong.");
//     expect(result.current.isLoading).toBe(false);
//   });
// });
